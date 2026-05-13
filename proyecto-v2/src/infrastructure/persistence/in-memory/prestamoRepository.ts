import { Prestamo } from "../../../domain/entities/Prestamo";
import { getStore } from "./dataStore";

export const listPrestamos = () => getStore().prestamos;

export const findPrestamoById = (id: string) =>
  getStore().prestamos.find((prestamo) => prestamo.id === id) || null;

export const addPrestamo = (prestamo: Prestamo) => {
  getStore().prestamos.push(prestamo);
};

export const updatePrestamo = (updated: Prestamo) => {
  const prestamos = getStore().prestamos;
  const index = prestamos.findIndex((prestamo) => prestamo.id === updated.id);
  if (index >= 0) {
    prestamos[index] = updated;
  }
};
