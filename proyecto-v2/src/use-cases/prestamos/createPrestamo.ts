import { Ejemplar } from "../../domain/entities/Ejemplar";
import { Prestamo } from "../../domain/entities/Prestamo";
import {
  findEjemplarById,
  updateEjemplar,
} from "../../infrastructure/persistence/sqlite/ejemplarRepository";
import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import {
  addPrestamo,
  listPrestamos,
} from "../../infrastructure/persistence/sqlite/prestamoRepository";
import { listMultasByUsuario } from "../../infrastructure/persistence/sqlite/multaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import { AppError } from "../../shared/errors/AppError";
import { addDays, toIsoString } from "../../shared/utils/dateUtils";
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

const getLimitePrestamos = (rol: string) => {
  if (rol === "estudiante_pregrado") {
    return 3;
  }
  if (rol === "estudiante_posgrado") {
    return 5;
  }
  throw new AppError("rol_estudiante_invalido", 400);
};

const validarBloqueos = async (usuarioId: string, nowIso: string) => {
  const multasRaw = await listMultasByUsuario(usuarioId);
  const multas = multasRaw.filter(
    (multa) => multa.estado === "pendiente",
  );
  if (multas.length > 0) {
    throw new AppError("multas_pendientes", 409);
  }

  const prestamosUsuarioRaw = await listPrestamos();
  const prestamosUsuario = prestamosUsuarioRaw.filter(
    (prestamo) => prestamo.usuario_id === usuarioId,
  );

  for (const prestamo of prestamosUsuario) {
    const normalized = await normalizePrestamo(prestamo, nowIso);
    if (normalized.estado === "vencido") {
      throw new AppError("estudiante_con_prestamo_vencido", 409);
    }
  }
};

const contarPrestamosActivos = async (usuarioId: string, nowIso: string) => {
  const prestamos = await listPrestamos();
  let count = 0;
  for (const prestamo of prestamos) {
    if (prestamo.usuario_id === usuarioId) {
      const normalized = await normalizePrestamo(prestamo, nowIso);
      if (isPrestamoActivo(normalized.estado)) {
        count++;
      }
    }
  }
  return count;
};
};

const validarEjemplarDisponible = (ejemplar: Ejemplar | null) => {
  if (!ejemplar) {
    throw new AppError("ejemplar_no_encontrado", 404);
  }
  if (ejemplar.estado !== "disponible") {
    throw new AppError("ejemplar_no_disponible", 409);
  }
};

export const executeCreatePrestamo = async (input: {
  estudiante_id: string;
  ejemplar_id: string;
}) => {
  const usuario = await findUsuarioById(input.estudiante_id);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  await validarBloqueos(usuario.id, nowIso);

  const limite = getLimitePrestamos(usuario.rol);
  const actuales = await contarPrestamosActivos(usuario.id, nowIso);
  if (actuales >= limite) {
    throw new AppError("limite_prestamos_alcanzado", 409, {
      limite,
      actuales,
    });
  }

  const ejemplar = await findEjemplarById(input.ejemplar_id);
  validarEjemplarDisponible(ejemplar);

  const libro = await findLibroById(ejemplar!.libro_id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const plazo = getPlazoDias(libro.tipo_prestamo);
  const fechaEsperada = addDays(nowIso, plazo);

  const nuevoPrestamo: Prestamo = {
    id: await nextId("prestamo"),
    usuario_id: usuario.id,
    ejemplar_id: ejemplar!.id,
    fecha_prestamo: nowIso,
    fecha_devolucion_esperada: fechaEsperada,
    fecha_devolucion_real: null,
    estado: "activo",
    renovaciones: 0,
  };

  const ejemplarActualizado: Ejemplar = {
    ...ejemplar!,
    estado: "prestado",
  };

  await addPrestamo(nuevoPrestamo);
  await updateEjemplar(ejemplarActualizado);

  return nuevoPrestamo;
};
