import { Estudiante, TipoEstudiante } from "../../domain/entities/Estudiante";
import {
  addEstudiante,
  findEstudianteByCodigoEstudiante,
} from "../../infrastructure/persistence/sqlite/estudianteRepository";
import { addUsuario } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import { AppError } from "../../shared/errors/AppError";

export type CrearEstudianteInput = {
  id?: string;
  codigo_estudiante?: string;
  nombre: string;
  correo?: string;
  tipo_estudiante?: TipoEstudiante;
  tipo?: TipoEstudiante;
  programa: string;
  facultad?: string;
};

const TIPOS_VALIDOS: TipoEstudiante[] = ["pregrado", "posgrado"];

export const executeCrearEstudiante = async (
  input: CrearEstudianteInput,
): Promise<Estudiante> => {
  const { nombre, programa, facultad } = input;

  const tipo_estudiante = input.tipo_estudiante || input.tipo;
  const id = input.id || await nextId("estudiante");
  const codigo_estudiante = input.codigo_estudiante || id;
  const correo = input.correo || `${id.toLowerCase()}@ucaldas.edu.co`;

  // Validaciones
  if (!nombre || !tipo_estudiante || !programa) {
    throw new AppError("campos_requeridos_faltantes", 400, {
      requeridos: ["nombre", "tipo_estudiante || tipo", "programa"],
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

  // Guardar en la tabla de estudiantes
  await addEstudiante(nuevoEstudiante);

  // También registrar en la tabla usuarios para que el sistema de préstamos (que usa usuarios) funcione perfectamente
  await addUsuario({
    id,
    codigo_estudiante,
    nombre,
    rol: tipo_estudiante === "pregrado" ? "estudiante_pregrado" : "estudiante_posgrado",
    estado: "activo",
  });

  return nuevoEstudiante;
};
