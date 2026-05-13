import { listPrestamos } from "../../infrastructure/persistence/in-memory/prestamoRepository";
import { findUsuarioById } from "../../infrastructure/persistence/in-memory/usuarioRepository";
import {
  isPrestamoActivo,
  normalizePrestamo,
} from "../prestamos/prestamoHelpers";
import { toIsoString } from "../../shared/utils/dateUtils";
import { AppError } from "../../shared/errors/AppError";

export const executeListPrestamosActivos = (usuarioId: string) => {
  const usuario = findUsuarioById(usuarioId);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  return listPrestamos()
    .filter((prestamo) => prestamo.usuario_id === usuarioId)
    .map((prestamo) => normalizePrestamo(prestamo, nowIso))
    .filter((prestamo) => isPrestamoActivo(prestamo.estado));
};
