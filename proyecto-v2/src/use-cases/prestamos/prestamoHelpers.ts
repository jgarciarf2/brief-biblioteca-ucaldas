import { Prestamo } from "../../domain/entities/Prestamo";
import { updatePrestamo } from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { isOverdue } from "../../shared/utils/dateUtils";

export const isPrestamoActivo = (estado: Prestamo["estado"]) =>
  estado === "activo" || estado === "renovado";

export const normalizePrestamo = async (prestamo: Prestamo, nowIso: string) => {
  if (prestamo.fecha_devolucion_real) {
    return prestamo;
  }

  if (isOverdue(prestamo.fecha_devolucion_esperada, nowIso)) {
    if (prestamo.estado !== "vencido") {
      const updated: Prestamo = { ...prestamo, estado: "vencido" };
      await updatePrestamo(updated);
      return updated;
    }
  }

  return prestamo;
};
