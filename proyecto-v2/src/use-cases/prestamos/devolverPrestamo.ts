import {
  findEjemplarById,
  updateEjemplar,
} from "../../infrastructure/persistence/sqlite/ejemplarRepository";
import { addMulta } from "../../infrastructure/persistence/sqlite/multaRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import {
  findPrestamoById,
  updatePrestamo,
} from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { AppError } from "../../shared/errors/AppError";
import {
  daysLate,
  isValidIsoDate,
  toIsoString,
} from "../../shared/utils/dateUtils";
import { isPrestamoActivo, normalizePrestamo } from "./prestamoHelpers";

export const executeDevolverPrestamo = async (
  prestamoId: string,
  fechaReal?: string,
) => {
  const prestamo = await findPrestamoById(prestamoId);
  if (!prestamo) {
    throw new AppError("prestamo_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  const normalized = await normalizePrestamo(prestamo, nowIso);

  if (
    !(isPrestamoActivo(normalized.estado) || normalized.estado === "vencido")
  ) {
    throw new AppError("prestamo_no_devoluble", 409);
  }

  const fechaDevolucionReal = fechaReal ? fechaReal : nowIso;
  if (!isValidIsoDate(fechaDevolucionReal)) {
    throw new AppError("fecha_devolucion_invalida", 400);
  }

  const actualizado: any = {
    ...normalized,
    fecha_devolucion_real: fechaDevolucionReal,
    estado: "devuelto",
  };

  await updatePrestamo(actualizado);

  const ejemplar = await findEjemplarById(actualizado.ejemplar_id);
  if (!ejemplar) {
    throw new AppError("ejemplar_no_encontrado", 404);
  }

  await updateEjemplar({
    ...ejemplar,
    estado: "disponible",
  });

  const dias = daysLate(
    actualizado.fecha_devolucion_esperada,
    fechaDevolucionReal,
  );
  if (dias > 0) {
    const multa: any = {
      id: await nextId("multa"),
      prestamo_id: actualizado.id,
      usuario_id: actualizado.usuario_id,
      dias_retraso: dias,
      valor_por_dia: 2000,
      valor_total: dias * 2000,
      estado: "pendiente",
      fecha_generacion: nowIso,
    };

    await addMulta(multa);
    return { prestamo: actualizado, multa };
  }

  return { prestamo: actualizado };
};
