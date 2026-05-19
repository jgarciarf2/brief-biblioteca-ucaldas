import { Usuario } from "../../../domain/entities/Usuario";
import { all, get, run } from "./db";

export const listUsuarios = async (): Promise<Usuario[]> => {
  return await all<Usuario>("SELECT * FROM usuarios");
};

export const findUsuarioById = async (id: string): Promise<Usuario | null> => {
  return await get<Usuario>("SELECT * FROM usuarios WHERE id = ?", [id]);
};

export const addUsuario = async (usuario: Usuario): Promise<void> => {
  await run(
    "INSERT INTO usuarios (id, codigo_estudiante, nombre, rol, estado) VALUES (?, ?, ?, ?, ?)",
    [
      usuario.id,
      usuario.codigo_estudiante,
      usuario.nombre,
      usuario.rol,
      usuario.estado,
    ],
  );
};
