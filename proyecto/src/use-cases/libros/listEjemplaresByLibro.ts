import { findLibroById } from "../../infrastructure/persistence/in-memory/libroRepository";
import { listEjemplaresByLibro } from "../../infrastructure/persistence/in-memory/ejemplarRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeListEjemplaresByLibro = (libroId: string) => {
  const libro = findLibroById(libroId);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }

  return listEjemplaresByLibro(libroId);
};
