import { Ejemplar } from "../../domain/entities/Ejemplar";
import { Prestamo } from "../../domain/entities/Prestamo";
import {
  findEjemplarById,
  updateEjemplar,
} from "../../infrastructure/persistence/in-memory/ejemplarRepository";
import { findLibroById } from "../../infrastructure/persistence/in-memory/libroRepository";
import {
  addPrestamo,
  listPrestamos,
} from "../../infrastructure/persistence/in-memory/prestamoRepository";
import { listMultasByUsuario } from "../../infrastructure/persistence/in-memory/multaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/in-memory/usuarioRepository";
import { nextId } from "../../infrastructure/persistence/in-memory/dataStore";
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

const validarBloqueos = (usuarioId: string, nowIso: string) => {
  const multas = listMultasByUsuario(usuarioId).filter(
    (multa) => multa.estado === "pendiente",
  );
  if (multas.length > 0) {
    throw new AppError("multas_pendientes", 409);
  }

  const prestamosUsuario = listPrestamos().filter(
    (prestamo) => prestamo.usuario_id === usuarioId,
  );

  const vencidos = prestamosUsuario.some((prestamo) => {
    const normalized = normalizePrestamo(prestamo, nowIso);
    return normalized.estado === "vencido";
  });

  if (vencidos) {
    throw new AppError("estudiante_con_prestamo_vencido", 409);
  }
};

const contarPrestamosActivos = (usuarioId: string, nowIso: string) => {
  return listPrestamos()
    .filter((prestamo) => prestamo.usuario_id === usuarioId)
    .filter((prestamo) => {
      const normalized = normalizePrestamo(prestamo, nowIso);
      return isPrestamoActivo(normalized.estado);
    }).length;
};

const validarEjemplarDisponible = (ejemplar: Ejemplar | null) => {
  if (!ejemplar) {
    throw new AppError("ejemplar_no_encontrado", 404);
  }
  if (ejemplar.estado !== "disponible") {
    throw new AppError("ejemplar_no_disponible", 409);
  }
};

export const executeCreatePrestamo = (input: {
  estudiante_id: string;
  ejemplar_id: string;
}) => {
  const usuario = findUsuarioById(input.estudiante_id);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const nowIso = toIsoString(new Date());
  validarBloqueos(usuario.id, nowIso);

  const limite = getLimitePrestamos(usuario.rol);
  const actuales = contarPrestamosActivos(usuario.id, nowIso);
  if (actuales >= limite) {
    throw new AppError("limite_prestamos_alcanzado", 409, {
      limite,
      actuales,
    });
  }

  const ejemplar = findEjemplarById(input.ejemplar_id);
  validarEjemplarDisponible(ejemplar);

  const libro = findLibroById(ejemplar.libro_id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const plazo = getPlazoDias(libro.tipo_prestamo);
  const fechaEsperada = addDays(nowIso, plazo);

  const nuevoPrestamo: Prestamo = {
    id: nextId("prestamo"),
    usuario_id: usuario.id,
    ejemplar_id: ejemplar.id,
    fecha_prestamo: nowIso,
    fecha_devolucion_esperada: fechaEsperada,
    fecha_devolucion_real: null,
    estado: "activo",
    renovaciones: 0,
  };

  const ejemplarActualizado: Ejemplar = {
    ...ejemplar,
    estado: "prestado",
  };

  addPrestamo(nuevoPrestamo);
  updateEjemplar(ejemplarActualizado);

  return nuevoPrestamo;
};
