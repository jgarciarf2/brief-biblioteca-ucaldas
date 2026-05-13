import { SolicitudEspera } from "../../../domain/entities/SolicitudEspera";
import { getStore } from "./dataStore";

export const listSolicitudes = () => getStore().solicitudesEspera;

export const listSolicitudesByLibro = (libroId: string) =>
  getStore().solicitudesEspera.filter(
    (solicitud) => solicitud.libro_id === libroId,
  );

export const addSolicitud = (solicitud: SolicitudEspera) => {
  getStore().solicitudesEspera.push(solicitud);
};
