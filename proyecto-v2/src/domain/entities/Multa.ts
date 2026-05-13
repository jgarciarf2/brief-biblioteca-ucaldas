export type MultaEstado = "pendiente" | "pagada";

export type Multa = {
  id: string;
  prestamo_id: string;
  usuario_id: string;
  dias_retraso: number;
  valor_por_dia: number;
  valor_total: number;
  estado: MultaEstado;
  fecha_generacion: string;
};
