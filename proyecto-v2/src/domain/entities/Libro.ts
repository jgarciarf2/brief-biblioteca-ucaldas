export type TipoPrestamo = "normal" | "alta_demanda";

export type Libro = {
  id: string;
  codigo_inventario: string;
  titulo: string;
  autor: string;
  sala: string;
  tipo_prestamo: TipoPrestamo;
  altaDemanda: boolean;
  activo: boolean;
};
