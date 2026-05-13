import { Ejemplar } from "../../../domain/entities/Ejemplar";
import { Libro } from "../../../domain/entities/Libro";
import { Multa } from "../../../domain/entities/Multa";
import { Prestamo } from "../../../domain/entities/Prestamo";
import { SolicitudEspera } from "../../../domain/entities/SolicitudEspera";
import { Usuario } from "../../../domain/entities/Usuario";

export type DataStore = {
  libros: Libro[];
  ejemplares: Ejemplar[];
  usuarios: Usuario[];
  prestamos: Prestamo[];
  multas: Multa[];
  solicitudesEspera: SolicitudEspera[];
};

const store: DataStore = {
  libros: [],
  ejemplares: [],
  usuarios: [],
  prestamos: [],
  multas: [],
  solicitudesEspera: [],
};

const counters = {
  prestamo: 1,
  multa: 1,
  solicitud: 1,
};

export const nextId = (key: keyof typeof counters) => {
  const current = counters[key];
  counters[key] += 1;
  return String(current);
};

export const getStore = () => store;

export const resetStore = () => {
  store.libros = [];
  store.ejemplares = [];
  store.usuarios = [];
  store.prestamos = [];
  store.multas = [];
  store.solicitudesEspera = [];
  counters.prestamo = 1;
  counters.multa = 1;
  counters.solicitud = 1;
};

export const seedStore = (data: Partial<DataStore>) => {
  if (data.libros) {
    store.libros = [...data.libros];
  }
  if (data.ejemplares) {
    store.ejemplares = [...data.ejemplares];
  }
  if (data.usuarios) {
    store.usuarios = [...data.usuarios];
  }
  if (data.prestamos) {
    store.prestamos = [...data.prestamos];
  }
  if (data.multas) {
    store.multas = [...data.multas];
  }
  if (data.solicitudesEspera) {
    store.solicitudesEspera = [...data.solicitudesEspera];
  }
};
