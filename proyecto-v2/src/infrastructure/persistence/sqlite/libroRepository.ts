import { Libro } from "../../../domain/entities/Libro";
import { all, get, run } from "./db";

const mapRow = (row: any): Libro => ({
  ...row,
  activo: Boolean(row.activo),
  altaDemanda: Boolean(row.alta_demanda),
});

export const listLibros = async (): Promise<Libro[]> => {
  const rows = await all<any>("SELECT * FROM libros");
  return rows.map(mapRow);
};

export const findLibroById = async (id: string): Promise<Libro | null> => {
  const row = await get<any>("SELECT * FROM libros WHERE id = ?", [id]);
  if (!row) return null;
  return mapRow(row);
};

export const addLibro = async (libro: Libro): Promise<void> => {
  await run(
    `INSERT INTO libros
      (id, codigo_inventario, titulo, autor, sala, tipo_prestamo, alta_demanda, activo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      libro.id,
      libro.codigo_inventario,
      libro.titulo,
      libro.autor,
      libro.sala,
      libro.tipo_prestamo,
      libro.altaDemanda ? 1 : 0,
      libro.activo ? 1 : 0,
    ],
  );
};
