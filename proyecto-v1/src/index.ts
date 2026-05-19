import express, { Request, Response } from "express";
import { initDb } from "./db/sqlite";
import {
  countPrestamosVigentesByLibro,
  createLibro,
  findLibroById,
  listLibrosWithDisponibles,
} from "./repositories/libroRepository";
import {
  createEstudiante,
  findEstudianteById,
} from "./repositories/estudianteRepository";
import {
  createPrestamo,
  findPrestamoById,
  listPrestamosVigentes,
  updatePrestamo,
} from "./repositories/prestamoRepository";

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.json({
    nombre: "Biblioteca UCaldas API",
    endpoints: [
      "GET /libros",
      "POST /libros",
      "POST /estudiantes",
      "POST /prestamos",
      "POST /prestamos/:id/devolver",
      "GET /prestamos/vigentes",
    ],
  });
});

app.get("/libros", async (_req: Request, res: Response) => {
  try {
    const respuesta = await listLibrosWithDisponibles();
    res.json(
      respuesta.map((libro) => ({
        id: libro.id,
        titulo: libro.titulo,
        autor: libro.autor,
        ejemplares: libro.ejemplares,
        sala: libro.sala,
        altaDemanda: libro.alta_demanda === 1,
        disponibles: libro.disponibles,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: "internal_error" });
  }
});

app.post("/estudiantes", async (req: Request, res: Response) => {
  try {
    const { id, nombre, programa, semestre, tipo } = req.body || {};

    if (!id || !nombre || !programa || semestre === undefined || !tipo) {
      return res.status(400).json({
        error: "id, nombre, programa, semestre y tipo son obligatorios",
      });
    }

    const tipoValue = String(tipo);
    if (tipoValue !== "pregrado" && tipoValue !== "posgrado") {
      return res.status(400).json({ error: "tipo invalido" });
    }

    const semestreNum = Number(semestre);
    if (Number.isNaN(semestreNum) || semestreNum <= 0) {
      return res.status(400).json({ error: "semestre invalido" });
    }

    const existente = await findEstudianteById(String(id));
    if (existente) {
      return res.status(409).json({ error: "El estudiante ya existe" });
    }

    const estudiante = await createEstudiante({
      id: String(id),
      nombre: String(nombre),
      programa: String(programa),
      semestre: semestreNum,
      tipo: tipoValue,
    });

    return res.status(201).json(estudiante);
  } catch (error) {
    return res.status(500).json({ error: "internal_error" });
  }
});

app.post("/libros", async (req: Request, res: Response) => {
  try {
    const { id, titulo, autor, sala, altaDemanda, alta_demanda, ejemplares } =
      req.body || {};

    if (!id || !titulo || !autor || !sala) {
      return res.status(400).json({
        error: "id, titulo, autor y sala son obligatorios",
      });
    }

    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      return res.status(400).json({ error: "id invalido" });
    }

    const altaDemandaRaw = altaDemanda ?? alta_demanda ?? false;
    const altaDemandaBool = Boolean(altaDemandaRaw);

    const ejemplaresNum = ejemplares === undefined ? 1 : Number(ejemplares);
    if (Number.isNaN(ejemplaresNum) || ejemplaresNum <= 0) {
      return res.status(400).json({ error: "ejemplares invalido" });
    }

    const existente = await findLibroById(idNum);
    if (existente) {
      return res.status(409).json({ error: "El libro ya existe" });
    }

    const libro = await createLibro({
      id: idNum,
      titulo: String(titulo),
      autor: String(autor),
      sala: String(sala),
      ejemplares: ejemplaresNum,
      alta_demanda: altaDemandaBool ? 1 : 0,
    });

    return res.status(201).json({
      id: libro.id,
      titulo: libro.titulo,
      autor: libro.autor,
      sala: libro.sala,
      ejemplares: libro.ejemplares,
      altaDemanda: libro.alta_demanda === 1,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal_error" });
  }
});

app.post("/prestamos", async (req: Request, res: Response) => {
  try {
    const { libroId, estudianteId, fechaPrestamo } = req.body || {};

    if (!libroId || !estudianteId) {
      return res.status(400).json({
        error: "libroId y estudianteId son obligatorios",
      });
    }

    const libroIdNum = Number(libroId);
    if (Number.isNaN(libroIdNum)) {
      return res.status(400).json({ error: "libroId invalido" });
    }

    const libro = await findLibroById(libroIdNum);
    if (!libro) {
      return res.status(404).json({ error: "El libro no existe" });
    }

    const vigentes = await countPrestamosVigentesByLibro(libroIdNum);
    const disponibles = libro.ejemplares - vigentes;

    if (disponibles <= 0) {
      return res.status(409).json({ error: "No hay ejemplares disponibles" });
    }

    const nuevoPrestamo = await createPrestamo({
      libro_id: libroIdNum,
      estudiante_id: String(estudianteId),
      fecha_prestamo: fechaPrestamo
        ? String(fechaPrestamo)
        : new Date().toISOString(),
    });

    return res.status(201).json({
      id: nuevoPrestamo.id,
      libroId: nuevoPrestamo.libro_id,
      estudianteId: nuevoPrestamo.estudiante_id,
      fechaPrestamo: nuevoPrestamo.fecha_prestamo,
      fechaDevolucion: nuevoPrestamo.fecha_devolucion,
      estado: nuevoPrestamo.estado,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal_error" });
  }
});

app.post("/prestamos/:id/devolver", async (req: Request, res: Response) => {
  try {
    const prestamoId = Number(req.params.id);
    if (Number.isNaN(prestamoId)) {
      return res.status(400).json({ error: "id invalido" });
    }

    const prestamo = await findPrestamoById(prestamoId);
    if (!prestamo) {
      return res.status(404).json({ error: "El prestamo no existe" });
    }

    if (prestamo.estado !== "vigente") {
      return res.status(409).json({ error: "El prestamo ya fue devuelto" });
    }

    const actualizado = await updatePrestamo(prestamoId, {
      estado: "devuelto",
      fecha_devolucion: new Date().toISOString(),
    });

    return res.json({
      id: actualizado.id,
      libroId: actualizado.libro_id,
      estudianteId: actualizado.estudiante_id,
      fechaPrestamo: actualizado.fecha_prestamo,
      fechaDevolucion: actualizado.fecha_devolucion,
      estado: actualizado.estado,
    });
  } catch (error) {
    return res.status(500).json({ error: "internal_error" });
  }
});

app.get("/prestamos/vigentes", async (_req: Request, res: Response) => {
  try {
    const vigentes = await listPrestamosVigentes();
    res.json(
      vigentes.map((prestamo) => ({
        id: prestamo.id,
        libroId: prestamo.libro_id,
        estudianteId: prestamo.estudiante_id,
        fechaPrestamo: prestamo.fecha_prestamo,
        fechaDevolucion: prestamo.fecha_devolucion,
        estado: prestamo.estado,
      })),
    );
  } catch (error) {
    res.status(500).json({ error: "internal_error" });
  }
});

const start = async () => {
  await initDb();
  app.listen(port, () => {
    console.log(`Servidor escuchando en puerto ${port}`);
  });
};

start().catch((error) => {
  console.error("Error al iniciar la aplicacion", error);
  process.exit(1);
});
