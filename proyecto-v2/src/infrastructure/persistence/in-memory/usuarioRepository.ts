import { Usuario } from "../../../domain/entities/Usuario";
import { getStore } from "./dataStore";

export const listUsuarios = () => getStore().usuarios;

export const findUsuarioById = (id: string) =>
  getStore().usuarios.find((usuario) => usuario.id === id) || null;

export const addUsuario = (usuario: Usuario) => {
  getStore().usuarios.push(usuario);
};
