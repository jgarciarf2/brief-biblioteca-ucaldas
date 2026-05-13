import { createApp } from "../../../src/infrastructure/http/server/app";
import {
  resetStore,
  seedStore,
} from "../../../src/infrastructure/persistence/in-memory/dataStore";
import { Ejemplar } from "../../../src/domain/entities/Ejemplar";
import { Libro } from "../../../src/domain/entities/Libro";
import { Usuario } from "../../../src/domain/entities/Usuario";

export const seedBaseData = () => {
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

  return { libro, ejemplar, usuario };
};

export const setupTestApp = () => createApp();

export const resetTestStore = () => resetStore();
