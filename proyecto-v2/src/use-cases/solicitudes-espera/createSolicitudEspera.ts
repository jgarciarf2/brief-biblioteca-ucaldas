import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import {
  listSolicitudes,
  addSolicitud,
} from "../../infrastructure/persistence/sqlite/solicitudEsperaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import { AppError } from "../../shared/errors/AppError";
import { toIsoString } from "../../shared/utils/dateUtils";

export const executeCreateSolicitudEspera = async (input: {
  estudiante_id: string;
  libro_id: string;
}) => {
  const usuario = await findUsuarioById(input.estudiante_id);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const libro = await findLibroById(input.libro_id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const allSolicitudes = await listSolicitudes();
  const existing = allSolicitudes.find(
    (solicitud) =>
      solicitud.libro_id === libro.id &&
      solicitud.usuario_id === usuario.id &&
      solicitud.estado === "activa",
  );

  if (existing) {
    throw new AppError("solicitud_ya_activa", 409);
  }

  const solicitud: any = {
    id: await nextId("solicitud"),
    libro_id: libro.id,
    usuario_id: usuario.id,
    fecha_solicitud: toIsoString(new Date()),
    estado: "activa",
  };

  await addSolicitud(solicitud);

  return solicitud;
};
