import express, { Request, Response } from "express";
import { initDb } from "./db/sqlite";
import {
  countPrestamosVigentesByLibro,
  findLibroById,
  listLibrosWithDisponibles,
} from "./repositories/libroRepository";
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
      "POST /prestamos",
      "POST /prestamos/:id/devolver",
      "GET /prestamos/vigentes",
    ],
  });
});

app.get("/libros", async (_req: Request, res: Response) => {
  try {
    const respuesta = await listLibrosWithDisponibles();
    res.json(respuesta);
  } catch (error) {
    res.status(500).json({ error: "internal_error" });
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
