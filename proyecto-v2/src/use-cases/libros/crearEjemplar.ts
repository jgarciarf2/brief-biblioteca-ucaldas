import { Ejemplar } from "../../domain/entities/Ejemplar";
import { addEjemplar } from "../../infrastructure/persistence/sqlite/ejemplarRepository";
import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeCrearEjemplar = async (
  libroId: string,
  input: { id: string; ubicacion_detalle?: string },
): Promise<Ejemplar> => {
  const { id, ubicacion_detalle } = input;

  if (!id) {
    throw new AppError("id_ejemplar_requerido", 400);
  }

  const libro = await findLibroById(libroId);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  const nuevoEjemplar: Ejemplar = {
    id,
    libro_id: libroId,
    estado: "disponible",
    ubicacion_detalle: ubicacion_detalle || "Estantería Principal",
  };

  await addEjemplar(nuevoEjemplar);
  return nuevoEjemplar;
};
