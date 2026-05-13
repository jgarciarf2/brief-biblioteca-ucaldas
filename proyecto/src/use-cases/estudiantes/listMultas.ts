import { listMultasByUsuario } from "../../infrastructure/persistence/in-memory/multaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/in-memory/usuarioRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeListMultas = (usuarioId: string, estado?: string) => {
  const usuario = findUsuarioById(usuarioId);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  return listMultasByUsuario(usuarioId).filter((multa) => {
    if (estado && multa.estado !== estado) {
      return false;
    }
    return true;
  });
};
