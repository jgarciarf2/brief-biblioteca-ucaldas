import fs from "fs/promises";
import path from "path";
import sqlite3 from "sqlite3";
import { Database, open } from "sqlite";

let dbInstance: Database<sqlite3.Database, sqlite3.Statement> | null = null;

export const openDb = async () => {
  if (dbInstance) {
    return dbInstance;
  }

  const dbPath = process.env.DB_PATH
    ? path.resolve(process.env.DB_PATH)
    : path.resolve(__dirname, "..", "..", "data", "biblioteca.sqlite");

  const dbDir = path.dirname(dbPath);
  await fs.mkdir(dbDir, { recursive: true });

  dbInstance = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  await dbInstance.exec("PRAGMA foreign_keys = ON;");

  return dbInstance;
};

const seedLibros = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
) => {
  const row = await db.get<{ total: number }>(
    "SELECT COUNT(*) as total FROM libros",
  );

  if (row && row.total > 0) {
    return;
  }

  const seed = [
    {
      id: 1,
      titulo: "Ingenieria de Software",
      autor: "Ian Sommerville",
      ejemplares: 3,
      sala: "Sala General",
      alta_demanda: 0,
    },
    {
      id: 2,
      titulo: "Clean Code",
      autor: "Robert C. Martin",
      ejemplares: 2,
      sala: "Sala General",
      alta_demanda: 0,
    },
    {
      id: 3,
      titulo: "Estructuras de Datos",
      autor: "Mark Allen Weiss",
      ejemplares: 1,
      sala: "Sala General",
      alta_demanda: 0,
    },
  ];

  const insertSql =
    "INSERT INTO libros (id, titulo, autor, ejemplares, sala, alta_demanda) VALUES (?, ?, ?, ?, ?, ?)";

  for (const libro of seed) {
    await db.run(insertSql, [
      libro.id,
      libro.titulo,
      libro.autor,
      libro.ejemplares,
      libro.sala,
      libro.alta_demanda,
    ]);
  }
};

const ensureLibroColumns = async (
  db: Database<sqlite3.Database, sqlite3.Statement>,
) => {
  const columns = await db.all<{ name: string }[]>(
    "PRAGMA table_info(libros)",
  );
  const columnNames = new Set(columns.map((column) => column.name));

  if (!columnNames.has("sala")) {
    await db.exec("ALTER TABLE libros ADD COLUMN sala TEXT");
  }

  if (!columnNames.has("alta_demanda")) {
    await db.exec(
      "ALTER TABLE libros ADD COLUMN alta_demanda INTEGER NOT NULL DEFAULT 0",
    );
  }
};

export const initDb = async () => {
  const db = await openDb();

  await db.exec(
    [
      "CREATE TABLE IF NOT EXISTS libros (",
      "id INTEGER PRIMARY KEY,",
      "titulo TEXT NOT NULL,",
      "autor TEXT NOT NULL,",
      "ejemplares INTEGER NOT NULL,",
      "sala TEXT,",
      "alta_demanda INTEGER NOT NULL DEFAULT 0",
      ");",
      "CREATE TABLE IF NOT EXISTS estudiantes (",
      "id TEXT PRIMARY KEY,",
      "nombre TEXT NOT NULL,",
      "programa TEXT NOT NULL,",
      "semestre INTEGER NOT NULL,",
      "tipo TEXT NOT NULL",
      ");",
      "CREATE TABLE IF NOT EXISTS prestamos (",
      "id INTEGER PRIMARY KEY AUTOINCREMENT,",
      "libro_id INTEGER NOT NULL,",
      "estudiante_id TEXT NOT NULL,",
      "fecha_prestamo TEXT NOT NULL,",
      "fecha_devolucion TEXT,",
      "estado TEXT NOT NULL,",
      "FOREIGN KEY (libro_id) REFERENCES libros(id)",
      ");",
    ].join("\n"),
  );

  await ensureLibroColumns(db);

  await seedLibros(db);
};
