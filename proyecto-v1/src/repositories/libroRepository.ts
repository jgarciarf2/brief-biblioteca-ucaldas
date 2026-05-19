import { openDb } from "../db/sqlite";

export type LibroRow = {
  id: number;
  titulo: string;
  autor: string;
  ejemplares: number;
  sala: string | null;
  alta_demanda: number;
};

export type LibroDisponible = LibroRow & { disponibles: number };

export const listLibrosWithDisponibles = async (): Promise<LibroDisponible[]> => {
  const db = await openDb();
  const rows = await db.all<LibroDisponible>(
    [
      "SELECT l.id, l.titulo, l.autor, l.ejemplares, l.sala, l.alta_demanda,",
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
    "SELECT id, titulo, autor, ejemplares, sala, alta_demanda FROM libros WHERE id = ?",
    [id],
  );

  return libro ?? null;
};

export const createLibro = async (data: {
  id: number;
  titulo: string;
  autor: string;
  ejemplares: number;
  sala: string | null;
  alta_demanda: number;
}): Promise<LibroRow> => {
  const db = await openDb();
  await db.run(
    [
      "INSERT INTO libros (id, titulo, autor, ejemplares, sala, alta_demanda)",
      "VALUES (?, ?, ?, ?, ?, ?)",
    ].join(" "),
    [
      data.id,
      data.titulo,
      data.autor,
      data.ejemplares,
      data.sala,
      data.alta_demanda,
    ],
  );

  const libro = await findLibroById(data.id);
  if (!libro) {
    throw new Error("libro_no_creado");
  }

  return libro;
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
