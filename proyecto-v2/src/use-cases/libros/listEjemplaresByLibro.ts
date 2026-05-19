import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import { listEjemplaresByLibro } from "../../infrastructure/persistence/sqlite/ejemplarRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeListEjemplaresByLibro = async (libroId: string) => {
  const libro = await findLibroById(libroId);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  return await listEjemplaresByLibro(libroId);
};
