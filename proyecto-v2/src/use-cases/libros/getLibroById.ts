import { findLibroById } from "../../infrastructure/persistence/in-memory/libroRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeGetLibroById = (id: string) => {
  const libro = findLibroById(id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }
  return libro;
};
