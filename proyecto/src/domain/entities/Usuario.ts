export type UsuarioRol =
  | "estudiante_pregrado"
  | "estudiante_posgrado"
  | "bibliotecario";
export type UsuarioEstado = "activo" | "bloqueado" | "inactivo";

export type Usuario = {
  id: string;
  codigo_estudiante: string;
  nombre: string;
  rol: UsuarioRol;
  estado: UsuarioEstado;
};
