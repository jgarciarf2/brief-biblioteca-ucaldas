import { findLibroById } from "../../infrastructure/persistence/sqlite/libroRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeGetLibroById = async (id: string) => {
  const libro = await findLibroById(id);
  if (!libro) {
    throw new AppError("libro_no_encontrado", 404);
  }
  return libro;
};
