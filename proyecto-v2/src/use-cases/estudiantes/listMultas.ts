import { listMultasByUsuario } from "../../infrastructure/persistence/sqlite/multaRepository";
import { findUsuarioById } from "../../infrastructure/persistence/sqlite/usuarioRepository";
import { AppError } from "../../shared/errors/AppError";

export const executeListMultas = async (usuarioId: string, estado?: string) => {
  const usuario = await findUsuarioById(usuarioId);
  if (!usuario) {
    throw new AppError("estudiante_no_encontrado", 404);
  }

  const multas = await listMultasByUsuario(usuarioId);
  return multas.filter((multa) => {
    if (estado && multa.estado !== estado) {
      return false;
    }
    return true;
  });
};
