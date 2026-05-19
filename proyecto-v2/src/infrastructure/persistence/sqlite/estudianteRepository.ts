import { Estudiante } from "../../../domain/entities/Estudiante";
import { all, get, run } from "./db";

export const listEstudiantes = async (): Promise<Estudiante[]> => {
  return await all<Estudiante>("SELECT * FROM estudiantes");
};

export const findEstudianteById = async (
  id: string,
): Promise<Estudiante | null> => {
  return await get<Estudiante>("SELECT * FROM estudiantes WHERE id = ?", [id]);
};

export const findEstudianteByCodigoEstudiante = async (
  codigo: string,
): Promise<Estudiante | null> => {
  return await get<Estudiante>(
    "SELECT * FROM estudiantes WHERE codigo_estudiante = ?",
    [codigo],
  );
};

export const addEstudiante = async (estudiante: Estudiante): Promise<void> => {
  await run(
    `INSERT INTO estudiantes
      (id, codigo_estudiante, nombre, correo, tipo_estudiante, programa, facultad, estado)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      estudiante.id,
      estudiante.codigo_estudiante,
      estudiante.nombre,
      estudiante.correo,
      estudiante.tipo_estudiante,
      estudiante.programa,
      estudiante.facultad ?? null,
      estudiante.estado,
    ],
  );
};
