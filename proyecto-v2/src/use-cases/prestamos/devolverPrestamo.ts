import {
  findEjemplarById,
  updateEjemplar,
} from "../../infrastructure/persistence/in-memory/ejemplarRepository";
import { addMulta } from "../../infrastructure/persistence/in-memory/multaRepository";
import { nextId } from "../../infrastructure/persistence/in-memory/dataStore";
import {
  findPrestamoById,
  updatePrestamo,
} from "../../infrastructure/persistence/in-memory/prestamoRepository";
import { AppError } from "../../shared/errors/AppError";
import {
  daysLate,
  isValidIsoDate,
  toIsoString,
} from "../../shared/utils/dateUtils";
import { isPrestamoActivo, normalizePrestamo } from "./prestamoHelpers";

export const executeDevolverPrestamo = (
  prestamoId: string,
  fechaReal?: string,
) => {
  const prestamo = findPrestamoById(prestamoId);
  if (!prestamo) {
    throw new AppError("prestamo_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  const normalized = normalizePrestamo(prestamo, nowIso);

  if (
    !(isPrestamoActivo(normalized.estado) || normalized.estado === "vencido")
  ) {
    throw new AppError("prestamo_no_devoluble", 409);
  }

  const fechaDevolucionReal = fechaReal ? fechaReal : nowIso;
  if (!isValidIsoDate(fechaDevolucionReal)) {
    throw new AppError("fecha_devolucion_invalida", 400);
  }

  const actualizado = {
    ...normalized,
    fecha_devolucion_real: fechaDevolucionReal,
    estado: "devuelto",
  };

  updatePrestamo(actualizado);

  const ejemplar = findEjemplarById(actualizado.ejemplar_id);
  if (!ejemplar) {
    throw new AppError("ejemplar_no_encontrado", 404);
  }

  updateEjemplar({
    ...ejemplar,
    estado: "disponible",
  });

  const dias = daysLate(
    actualizado.fecha_devolucion_esperada,
    fechaDevolucionReal,
  );
  if (dias > 0) {
    const multa = {
      id: nextId("multa"),
      prestamo_id: actualizado.id,
      usuario_id: actualizado.usuario_id,
      dias_retraso: dias,
      valor_por_dia: 2000,
      valor_total: dias * 2000,
      estado: "pendiente",
      fecha_generacion: nowIso,
    };

    addMulta(multa);
    return { prestamo: actualizado, multa };
  }

  return { prestamo: actualizado };
};
