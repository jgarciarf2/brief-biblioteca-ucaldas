import sqlite3 from "sqlite3";
import path from "path";
import { seedBaseData } from "./seed";

const DB_PATH = path.resolve(__dirname, "../../../../db/database.db");

export const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error("Error opening database", err.message);
  } else {
    console.log("Connected to SQLite database.");
    initializeSchema();
  }
});

function initializeSchema() {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS libros (
      id TEXT PRIMARY KEY,
      codigo_inventario TEXT NOT NULL,
      titulo TEXT NOT NULL,
      autor TEXT NOT NULL,
      sala TEXT NOT NULL,
      tipo_prestamo TEXT NOT NULL,
      activo INTEGER NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS ejemplares (
      id TEXT PRIMARY KEY,
      libro_id TEXT NOT NULL,
      estado TEXT NOT NULL,
      ubicacion_detalle TEXT,
      FOREIGN KEY (libro_id) REFERENCES libros (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
      id TEXT PRIMARY KEY,
      codigo_estudiante TEXT NOT NULL UNIQUE,
      nombre TEXT NOT NULL,
      rol TEXT NOT NULL,
      estado TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS prestamos (
      id TEXT PRIMARY KEY,
      usuario_id TEXT NOT NULL,
      ejemplar_id TEXT NOT NULL,
      fecha_prestamo TEXT NOT NULL,
      fecha_devolucion_esperada TEXT NOT NULL,
      fecha_devolucion_real TEXT,
      estado TEXT NOT NULL,
      renovaciones INTEGER NOT NULL,
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id),
      FOREIGN KEY (ejemplar_id) REFERENCES ejemplares (id)
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS multas (
      id TEXT PRIMARY KEY,
      prestamo_id TEXT NOT NULL,
      usuario_id TEXT NOT NULL,
      dias_retraso INTEGER NOT NULL,
      valor_por_dia REAL NOT NULL,
      valor_total REAL NOT NULL,
      estado TEXT NOT NULL,
      fecha_generacion TEXT NOT NULL,
      FOREIGN KEY (prestamo_id) REFERENCES prestamos (id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )`);

    db.run(
      `CREATE TABLE IF NOT EXISTS solicitudes_espera (
      id TEXT PRIMARY KEY,
      libro_id TEXT NOT NULL,
      usuario_id TEXT NOT NULL,
      fecha_solicitud TEXT NOT NULL,
      estado TEXT NOT NULL,
      FOREIGN KEY (libro_id) REFERENCES libros (id),
      FOREIGN KEY (usuario_id) REFERENCES usuarios (id)
    )`,
      () => {
        seedBaseData().catch(console.error);
      },
    );
  });
}

export const run = (sql: string, params: any[] = []): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const get = <T>(sql: string, params: any[] = []): Promise<T | null> => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve((row as T) || null);
    });
  });
};

export const all = <T>(sql: string, params: any[] = []): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
};
