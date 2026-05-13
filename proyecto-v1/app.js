const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const libros = [
  {
    id: 1,
    titulo: "Ingenieria de Software",
    autor: "Ian Sommerville",
    ejemplares: 3
  },
  {
    id: 2,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    ejemplares: 2
  },
  {
    id: 3,
    titulo: "Estructuras de Datos",
    autor: "Mark Allen Weiss",
    ejemplares: 1
  }
];

const prestamos = [];
let siguientePrestamoId = 1;

const contarPrestamosVigentesPorLibro = (libroId) =>
  prestamos.filter((prestamo) => prestamo.libroId === libroId && prestamo.estado === "vigente")
    .length;

const obtenerDisponibilidad = (libro) =>
  libro.ejemplares - contarPrestamosVigentesPorLibro(libro.id);

app.get("/", (req, res) => {
  res.json({
    nombre: "Biblioteca UCaldas API",
    endpoints: [
      "GET /libros",
      "POST /prestamos",
      "POST /prestamos/:id/devolver",
      "GET /prestamos/vigentes"
    ]
  });
});

app.get("/libros", (req, res) => {
  const respuesta = libros.map((libro) => ({
    ...libro,
    disponibles: obtenerDisponibilidad(libro)
  }));

  res.json(respuesta);
});

app.post("/prestamos", (req, res) => {
  const { libroId, estudianteId, fechaPrestamo } = req.body;

  if (!libroId || !estudianteId) {
    return res.status(400).json({
      error: "libroId y estudianteId son obligatorios"
    });
  }

  const libro = libros.find((item) => item.id === Number(libroId));

  if (!libro) {
    return res.status(404).json({
      error: "El libro no existe"
    });
  }

  if (obtenerDisponibilidad(libro) <= 0) {
    return res.status(409).json({
      error: "No hay ejemplares disponibles"
    });
  }

  const nuevoPrestamo = {
    id: siguientePrestamoId++,
    libroId: libro.id,
    estudianteId: String(estudianteId),
    fechaPrestamo: fechaPrestamo || new Date().toISOString(),
    fechaDevolucion: null,
    estado: "vigente"
  };

  prestamos.push(nuevoPrestamo);

  return res.status(201).json(nuevoPrestamo);
});

app.post("/prestamos/:id/devolver", (req, res) => {
  const prestamoId = Number(req.params.id);
  const prestamo = prestamos.find((item) => item.id === prestamoId);

  if (!prestamo) {
    return res.status(404).json({
      error: "El prestamo no existe"
    });
  }

  if (prestamo.estado !== "vigente") {
    return res.status(409).json({
      error: "El prestamo ya fue devuelto"
    });
  }

  prestamo.estado = "devuelto";
  prestamo.fechaDevolucion = new Date().toISOString();

  return res.json(prestamo);
});

app.get("/prestamos/vigentes", (req, res) => {
  const vigentes = prestamos.filter((prestamo) => prestamo.estado === "vigente");
  res.json(vigentes);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`);
});
