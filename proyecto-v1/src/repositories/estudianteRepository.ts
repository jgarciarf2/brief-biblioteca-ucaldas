import { openDb } from "../db/sqlite";

export type EstudianteRow = {
  id: string;
  nombre: string;
  programa: string;
  semestre: number;
  tipo: "pregrado" | "posgrado";
};

export const findEstudianteById = async (
  id: string,
): Promise<EstudianteRow | null> => {
  const db = await openDb();
  const estudiante = await db.get<EstudianteRow>(
    "SELECT id, nombre, programa, semestre, tipo FROM estudiantes WHERE id = ?",
    [id],
  );

  return estudiante ?? null;
};

export const createEstudiante = async (
  data: EstudianteRow,
): Promise<EstudianteRow> => {
  const db = await openDb();
  await db.run(
    [
      "INSERT INTO estudiantes (id, nombre, programa, semestre, tipo)",
      "VALUES (?, ?, ?, ?, ?)",
    ].join(" "),
    [data.id, data.nombre, data.programa, data.semestre, data.tipo],
  );

  const estudiante = await findEstudianteById(data.id);
  if (!estudiante) {
    throw new Error("estudiante_no_creado");
  }

  return estudiante;
};
