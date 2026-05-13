import { Multa } from "../../../domain/entities/Multa";
import { getStore } from "./dataStore";

export const listMultas = () => getStore().multas;

export const listMultasByUsuario = (usuarioId: string) =>
  getStore().multas.filter((multa) => multa.usuario_id === usuarioId);

export const addMulta = (multa: Multa) => {
  getStore().multas.push(multa);
};
