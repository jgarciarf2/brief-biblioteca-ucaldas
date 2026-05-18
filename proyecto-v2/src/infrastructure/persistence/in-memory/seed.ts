import { Ejemplar } from "../../../domain/entities/Ejemplar";
import { Libro } from "../../../domain/entities/Libro";
import { Usuario } from "../../../domain/entities/Usuario";
import { getStore, seedStore } from "./dataStore";

const hasData = () => {
  const store = getStore();
  return (
    store.libros.length > 0 ||
    store.ejemplares.length > 0 ||
    store.usuarios.length > 0
  );
};

export const seedBaseData = () => {
  if (hasData()) {
    return;
  }

  const libro: Libro = {
    id: "lib-1",
    codigo_inventario: "INV-001",
    titulo: "Libro Uno",
    autor: "Autor Uno",
    sala: "A",
    tipo_prestamo: "normal",
    activo: true,
  };

  const ejemplar: Ejemplar = {
    id: "ej-1",
    libro_id: "lib-1",
    estado: "disponible",
    ubicacion_detalle: "EST-1",
  };

  const usuario: Usuario = {
    id: "user-1",
    codigo_estudiante: "STU-001",
    nombre: "Estudiante Uno",
    rol: "estudiante_pregrado",
    estado: "activo",
  };

  seedStore({
    libros: [libro],
    ejemplares: [ejemplar],
    usuarios: [usuario],
  });
};
