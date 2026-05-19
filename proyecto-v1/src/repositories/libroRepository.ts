import { openDb } from "../db/sqlite";

export type LibroRow = {
  id: number;
  titulo: string;
  autor: string;
  ejemplares: number;
};

export type LibroDisponible = LibroRow & { disponibles: number };

export const listLibrosWithDisponibles = async (): Promise<LibroDisponible[]> => {
  const db = await openDb();
  const rows = await db.all<LibroDisponible>(
    [
      "SELECT l.id, l.titulo, l.autor, l.ejemplares,",
      "l.ejemplares - COALESCE(v.cnt, 0) AS disponibles",
      "FROM libros l",
      "LEFT JOIN (",
      "  SELECT libro_id, COUNT(*) AS cnt",
      "  FROM prestamos",
      "  WHERE estado = 'vigente'",
      "  GROUP BY libro_id",
      ") v ON l.id = v.libro_id",
      "ORDER BY l.id",
    ].join("\n"),
  );

  return rows.map((row) => ({
    ...row,
    disponibles: Number(row.disponibles),
  }));
};

export const findLibroById = async (id: number): Promise<LibroRow | null> => {
  const db = await openDb();
  const libro = await db.get<LibroRow>(
    "SELECT id, titulo, autor, ejemplares FROM libros WHERE id = ?",
    [id],
  );

  return libro ?? null;
};

export const countPrestamosVigentesByLibro = async (
  libroId: number,
): Promise<number> => {
  const db = await openDb();
  const row = await db.get<{ total: number }>(
    "SELECT COUNT(*) as total FROM prestamos WHERE libro_id = ? AND estado = 'vigente'",
    [libroId],
  );

  return row ? Number(row.total) : 0;
};
