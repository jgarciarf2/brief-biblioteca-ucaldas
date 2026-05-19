import { listPrestamos } from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { normalizePrestamo } from "./prestamoHelpers";
import { toIsoString } from "../../shared/utils/dateUtils";
import { AppError } from "../../shared/errors/AppError";

export const executeListPrestamosVencidos = async (usuarioId?: string) => {
  const nowIso = toIsoString(new Date());

  if (usuarioId) {
    const usuario = await findUsuarioById(usuarioId);
    if (!usuario) {
      throw new AppError("estudiante_no_encontrado", 404);
    }
  }

  const allPrestamos = await listPrestamos();
  const filtered = allPrestamos.filter((prestamo) =>
    usuarioId ? prestamo.usuario_id === usuarioId : true,
  );

  const normalized = [];
  for (const p of filtered) {
    normalized.push(await normalizePrestamo(p, nowIso));
  }

  return normalized.filter((p) => p.estado === "vencido");
};
