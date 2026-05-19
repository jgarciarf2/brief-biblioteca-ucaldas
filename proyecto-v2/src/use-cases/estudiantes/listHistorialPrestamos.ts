import { listPrestamos } from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { normalizePrestamo } from "../prestamos/prestamoHelpers";
import { isValidIsoDate, toIsoString } from "../../shared/utils/dateUtils";
import { AppError } from "../../shared/errors/AppError";

export const executeListHistorialPrestamos = async (input: {
  usuarioId: string;
  estado?: string;
  desde?: string;
  hasta?: string;
}) => {
  const usuario = await findUsuarioById(input.usuarioId);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());

  if (input.desde && !isValidIsoDate(input.desde)) {
    throw new AppError("fecha_desde_invalida", 400);
  }
  if (input.hasta && !isValidIsoDate(input.hasta)) {
    throw new AppError("fecha_hasta_invalida", 400);
  }

  const allPrestamos = await listPrestamos();
  const filtered = allPrestamos.filter(
    (prestamo) => prestamo.usuario_id === input.usuarioId,
  );

  const normalized = [];
  for (const prestamo of filtered) {
    normalized.push(await normalizePrestamo(prestamo, nowIso));
  }

  return normalized.filter((prestamo) => {
    if (input.estado && prestamo.estado !== input.estado) {
      return false;
    }
    if (
      input.desde &&
      Date.parse(prestamo.fecha_prestamo) < Date.parse(input.desde)
    ) {
      return false;
    }
    if (
      input.hasta &&
      Date.parse(prestamo.fecha_prestamo) > Date.parse(input.hasta)
    ) {
      return false;
    }
    return true;
  });
};
