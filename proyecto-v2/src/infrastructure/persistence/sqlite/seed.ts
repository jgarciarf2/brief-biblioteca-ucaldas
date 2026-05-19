import { Libro } from "../../../domain/entities/Libro";
import { Ejemplar } from "../../../domain/entities/Ejemplar";
import { Usuario } from "../../../domain/entities/Usuario";
import { addLibro } from "./libroRepository";
import { addEjemplar } from "./ejemplarRepository";
import { addUsuario } from "./usuarioRepository";
import { get } from "./db";

export const seedBaseData = async () => {
  const row = await get("SELECT COUNT(*) as count FROM libros");
  if ((row as any).count > 0) return;

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

  await addLibro(libro);
  await addEjemplar(ejemplar);
  await addUsuario(usuario);
};
