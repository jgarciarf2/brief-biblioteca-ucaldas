import { Libro } from "../../../domain/entities/Libro";
import { all, get, run } from "./db";

export const listLibros = async (): Promise<Libro[]> => {
  const rows = await all<any>("SELECT * FROM libros");
  return rows.map((row) => ({
    ...row,
    activo: Boolean(row.activo),
  }));
};

export const findLibroById = async (id: string): Promise<Libro | null> => {
  const row = await get<any>("SELECT * FROM libros WHERE id = ?", [id]);
  if (!row) return null;
  return {
    ...row,
    activo: Boolean(row.activo),
  };
};

export const addLibro = async (libro: Libro): Promise<void> => {
  await run(
    "INSERT INTO libros (id, codigo_inventario, titulo, autor, sala, tipo_prestamo, activo) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      libro.id,
      libro.codigo_inventario,
      libro.titulo,
      libro.autor,
      libro.sala,
      libro.tipo_prestamo,
      libro.activo ? 1 : 0,
    ],
  );
};
