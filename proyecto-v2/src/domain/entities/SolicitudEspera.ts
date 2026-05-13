export type SolicitudEstado = "activa" | "atendida" | "cancelada";

export type SolicitudEspera = {
  id: string;
  libro_id: string;
  usuario_id: string;
  fecha_solicitud: string;
  estado: SolicitudEstado;
};
