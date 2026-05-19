import { Libro, TipoPrestamo } from "../../domain/entities/Libro";
import {
  addLibro,
} from "../../infrastructure/persistence/sqlite/libroRepository";
import { nextId } from "../../infrastructure/persistence/sqlite/dataStore";
import { AppError } from "../../shared/errors/AppError";

export type CrearLibroInput = {
  id?: string;
  codigo_inventario?: string;
  titulo: string;
  autor: string;
  sala: string;
  tipo_prestamo?: TipoPrestamo;
  altaDemanda: boolean;
};

const TIPOS_PRESTAMO_VALIDOS: TipoPrestamo[] = ["normal", "alta_demanda"];

export const executeCrearLibro = async (
  input: CrearLibroInput,
): Promise<Libro> => {
  const {
    titulo,
    autor,
    sala,
    tipo_prestamo,
    altaDemanda,
  } = input;

  const id = input.id || await nextId("libro");
  const codigo_inventario = input.codigo_inventario || id;

  // Validaciones
  if (!titulo || !autor || !sala) {
    throw new AppError("campos_requeridos_faltantes", 400, {
      requeridos: ["titulo", "autor", "sala"],
    });
  }

  if (typeof altaDemanda !== "boolean") {
    throw new AppError("campo_alta_demanda_requerido", 400, {
      detalle: "El campo 'altaDemanda' es obligatorio y debe ser boolean.",
    });
  }

  // Derivar tipo_prestamo automáticamente desde altaDemanda si no se envía
  const tipoPrestamo: TipoPrestamo =
    tipo_prestamo && TIPOS_PRESTAMO_VALIDOS.includes(tipo_prestamo)
      ? tipo_prestamo
      : altaDemanda
      ? "alta_demanda"
      : "normal";

  const nuevoLibro: Libro = {
    id,
    codigo_inventario,
    titulo,
    autor,
    sala,
    tipo_prestamo: tipoPrestamo,
    altaDemanda,
    activo: true,
  };

  await addLibro(nuevoLibro);
  return nuevoLibro;
};
