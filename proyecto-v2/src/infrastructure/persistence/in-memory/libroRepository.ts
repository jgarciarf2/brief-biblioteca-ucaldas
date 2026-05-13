import { Libro } from "../../../domain/entities/Libro";
import { getStore } from "./dataStore";

export const listLibros = () => getStore().libros;

export const findLibroById = (id: string) =>
  getStore().libros.find((libro) => libro.id === id) || null;

export const addLibro = (libro: Libro) => {
  getStore().libros.push(libro);
};
