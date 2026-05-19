import { Estudiante, TipoEstudiante } from "../../domain/entities/Estudiante";
import {
  addEstudiante,
  findEstudianteByCodigoEstudiante,
} from "../../infrastructure/persistence/sqlite/estudianteRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import { AppError } from "../../shared/errors/AppError";

export type CrearEstudianteInput = {
  codigo_estudiante: string;
  nombre: string;
  correo: string;
  tipo_estudiante: TipoEstudiante;
  programa: string;
  facultad?: string;
};

const TIPOS_VALIDOS: TipoEstudiante[] = ["pregrado", "posgrado"];

export const executeCrearEstudiante = async (
  input: CrearEstudianteInput,
): Promise<Estudiante> => {
  const { codigo_estudiante, nombre, correo, tipo_estudiante, programa, facultad } =
    input;

  // Validaciones
  if (!codigo_estudiante || !nombre || !correo || !tipo_estudiante || !programa) {
    throw new AppError("campos_requeridos_faltantes", 400, {
      requeridos: ["codigo_estudiante", "nombre", "correo", "tipo_estudiante", "programa"],
    });
  }

  if (!TIPOS_VALIDOS.includes(tipo_estudiante)) {
    throw new AppError("tipo_estudiante_invalido", 400, {
      validos: TIPOS_VALIDOS,
      recibido: tipo_estudiante,
    });
  }

  // Verificar unicidad del código
  const existente = await findEstudianteByCodigoEstudiante(codigo_estudiante);
  if (existente) {
    throw new AppError("codigo_estudiante_duplicado", 409, {
      codigo_estudiante,
    });
  }

  const id = await nextId("estudiante");

  const nuevoEstudiante: Estudiante = {
    id,
    codigo_estudiante,
    nombre,
    correo,
    tipo_estudiante,
    programa,
    facultad,
    estado: "activo",
  };

  await addEstudiante(nuevoEstudiante);
  return nuevoEstudiante;
};
