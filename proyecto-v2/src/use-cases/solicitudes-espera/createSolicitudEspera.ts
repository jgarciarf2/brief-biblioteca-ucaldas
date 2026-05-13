import { findLibroById } from "../../infrastructure/persistence/in-memory/libroRepository";
import {
  listSolicitudes,
  addSolicitud,
} from "../../infrastructure/persistence/in-memory/solicitudEsperaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/in-memory/usuarioRepository";
import { nextId } from "../../infrastructure/persistence/in-memory/dataStore";
import { AppError } from "../../shared/errors/AppError";
import { toIsoString } from "../../shared/utils/dateUtils";

export const executeCreateSolicitudEspera = (input: {
  estudiante_id: string;
  libro_id: string;
}) => {
  const usuario = findUsuarioById(input.estudiante_id);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const libro = findLibroById(input.libro_id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const existing = listSolicitudes().find(
    (solicitud) =>
      solicitud.libro_id === libro.id &&
      solicitud.usuario_id === usuario.id &&
      solicitud.estado === "activa",
  );

  if (existing) {
    throw new AppError("solicitud_ya_activa", 409);
  }

  const solicitud = {
    id: nextId("solicitud"),
    libro_id: libro.id,
    usuario_id: usuario.id,
    fecha_solicitud: toIsoString(new Date()),
    estado: "activa",
  };

  addSolicitud(solicitud);

  return solicitud;
};
