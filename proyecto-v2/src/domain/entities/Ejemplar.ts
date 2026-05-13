export type EjemplarEstado =
  | "disponible"
  | "prestado"
  | "mantenimiento"
  | "baja";

export type Ejemplar = {
  id: string;
  libro_id: string;
  estado: EjemplarEstado;
  ubicacion_detalle?: string;
};
