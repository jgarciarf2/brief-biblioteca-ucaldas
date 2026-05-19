export type TipoEstudiante = "pregrado" | "posgrado";
export type EstudianteEstado = "activo" | "bloqueado" | "inactivo";

export type Estudiante = {
  id: string;
  codigo_estudiante: string;
  nombre: string;
  correo: string;
  tipo_estudiante: TipoEstudiante;
  programa: string;
  facultad?: string;
  estado: EstudianteEstado;
};
