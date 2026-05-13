import { Ejemplar } from "../../../domain/entities/Ejemplar";
import { getStore } from "./dataStore";

export const listEjemplares = () => getStore().ejemplares;

export const listEjemplaresByLibro = (libroId: string) =>
  getStore().ejemplares.filter((ejemplar) => ejemplar.libro_id === libroId);

export const findEjemplarById = (id: string) =>
  getStore().ejemplares.find((ejemplar) => ejemplar.id === id) || null;

export const updateEjemplar = (updated: Ejemplar) => {
  const ejemplares = getStore().ejemplares;
  const index = ejemplares.findIndex((ejemplar) => ejemplar.id === updated.id);
  if (index >= 0) {
    ejemplares[index] = updated;
  }
};

export const addEjemplar = (ejemplar: Ejemplar) => {
  getStore().ejemplares.push(ejemplar);
};
