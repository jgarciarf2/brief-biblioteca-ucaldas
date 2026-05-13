import { listPrestamos } from "../../infrastructure/persistence/in-memory/prestamoRepository";
import { findUsuarioById } from "../../infrastructure/persistence/in-memory/usuarioRepository";
import { normalizePrestamo } from "./prestamoHelpers";
import { toIsoString } from "../../shared/utils/dateUtils";
import { AppError } from "../../shared/errors/AppError";

export const executeListPrestamosVencidos = (usuarioId?: string) => {
  const nowIso = toIsoString(new Date());

  if (usuarioId) {
    const usuario = findUsuarioById(usuarioId);
    if (!usuario) {
      throw new AppError("estudiante_no_encontrado", 404);
    }
  }

  return listPrestamos()
    .filter((prestamo) =>
      usuarioId ? prestamo.usuario_id === usuarioId : true,
    )
    .map((prestamo) => normalizePrestamo(prestamo, nowIso))
    .filter((prestamo) => prestamo.estado === "vencido");
};
