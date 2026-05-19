import { SolicitudEspera } from "../../../domain/entities/SolicitudEspera";
import { all, get, run } from "./db";

export const listSolicitudes = async (): Promise<SolicitudEspera[]> => {
  return await all<SolicitudEspera>("SELECT * FROM solicitudes_espera");
};

export const listSolicitudesByLibro = async (
  libroId: string,
): Promise<SolicitudEspera[]> => {
  return await all<SolicitudEspera>(
    "SELECT * FROM solicitudes_espera WHERE libro_id = ?",
    [libroId],
  );
};

export const addSolicitud = async (
  solicitud: SolicitudEspera,
): Promise<void> => {
  await run(
    "INSERT INTO solicitudes_espera (id, libro_id, usuario_id, fecha_solicitud, estado) VALUES (?, ?, ?, ?, ?)",
    [
      solicitud.id,
      solicitud.libro_id,
      solicitud.usuario_id,
      solicitud.fecha_solicitud,
      solicitud.estado,
    ],
  );
};
