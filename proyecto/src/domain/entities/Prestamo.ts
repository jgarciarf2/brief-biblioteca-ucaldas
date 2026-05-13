export type PrestamoEstado = "activo" | "vencido" | "devuelto" | "renovado";

export type Prestamo = {
  id: string;
  usuario_id: string;
  ejemplar_id: string;
  fecha_prestamo: string;
  fecha_devolucion_esperada: string;
  fecha_devolucion_real: string | null;
  estado: PrestamoEstado;
  renovaciones: number;
};
