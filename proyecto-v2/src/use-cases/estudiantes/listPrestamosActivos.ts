import { listPrestamos } from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import {
  isPrestamoActivo,
  normalizePrestamo,
} from "../prestamos/prestamoHelpers";
import { toIsoString } from "../../shared/utils/dateUtils";
import { AppError } from "../../shared/errors/AppError";

export const executeListPrestamosActivos = async (usuarioId: string) => {
  const usuario = await findUsuarioById(usuarioId);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  const allPrestamos = await listPrestamos();
  const filtered = allPrestamos.filter(
    (prestamo) => prestamo.usuario_id === usuarioId,
  );

  const normalized = [];
  for (const p of filtered) {
    normalized.push(await normalizePrestamo(p, nowIso));
  }

  return normalized.filter((prestamo) => isPrestamoActivo(prestamo.estado));
};
