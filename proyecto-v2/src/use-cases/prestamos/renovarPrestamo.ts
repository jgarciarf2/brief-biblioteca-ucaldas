import { findEjemplarById } from "../../infrastructure/persistence/sqlite/ejemplarRepository";
import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import {
  findPrestamoById,
  updatePrestamo,
} from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { listSolicitudesByLibro } from "../../infrastructure/persistence/sqlite/solicitudEsperaRepository";
import { AppError } from "../../shared/errors/AppError";
import { addDays, isOverdue, toIsoString } from "../../shared/utils/dateUtils";
import { isPrestamoActivo, normalizePrestamo } from "./prestamoHelpers";

const getPlazoDias = (tipoPrestamo: string) => {
  if (tipoPrestamo === "normal") {
    return 15;
  }
  if (tipoPrestamo === "alta_demanda") {
    return 3;
  }
  throw new AppError("tipo_prestamo_invalido", 400);
};

export const executeRenovarPrestamo = async (prestamoId: string) => {
  const prestamo = await findPrestamoById(prestamoId);
  if (!prestamo) {
    throw new AppError("prestamo_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  const normalized = await normalizePrestamo(prestamo, nowIso);

  if (!isPrestamoActivo(normalized.estado)) {
    throw new AppError("prestamo_no_renovable", 409);
  }

  if (isOverdue(normalized.fecha_devolucion_esperada, nowIso)) {
    throw new AppError("prestamo_vencido", 409);
  }

  const ejemplar = await findEjemplarById(normalized.ejemplar_id);
  if (!ejemplar) {
    throw new AppError("ejemplar_no_encontrado", 404);
  }

  const libro = await findLibroById(ejemplar.libro_id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const solicitudesActivasRaw = await listSolicitudesByLibro(libro.id);
  const solicitudesActivas = solicitudesActivasRaw.filter(
    (solicitud) => solicitud.estado === "activa",
  );

  if (solicitudesActivas.length > 0) {
    throw new AppError("libro_con_solicitudes_en_espera", 409);
  }

  const plazo = getPlazoDias(libro.tipo_prestamo);
  const nuevaFecha = addDays(normalized.fecha_devolucion_esperada, plazo);

  const actualizado: any = {
    ...normalized,
    fecha_devolucion_esperada: nuevaFecha,
    renovaciones: normalized.renovaciones + 1,
    estado: "renovado",
  };

  await updatePrestamo(actualizado);

  return actualizado;
};
