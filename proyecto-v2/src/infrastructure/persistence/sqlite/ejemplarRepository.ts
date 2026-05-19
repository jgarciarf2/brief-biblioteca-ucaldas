import { Ejemplar } from "../../../domain/entities/Ejemplar";
import { all, get, run } from "./db";

export const listEjemplares = async (): Promise<Ejemplar[]> => {
  return await all<Ejemplar>("SELECT * FROM ejemplares");
};

export const findEjemplarById = async (
  id: string,
): Promise<Ejemplar | null> => {
  return await get<Ejemplar>("SELECT * FROM ejemplares WHERE id = ?", [id]);
};

export const listEjemplaresByLibro = async (
  libroId: string,
): Promise<Ejemplar[]> => {
  return await all<Ejemplar>("SELECT * FROM ejemplares WHERE libro_id = ?", [
    libroId,
  ]);
};

export const addEjemplar = async (ejemplar: Ejemplar): Promise<void> => {
  await run(
    "INSERT INTO ejemplares (id, libro_id, estado, ubicacion_detalle) VALUES (?, ?, ?, ?)",
    [
      ejemplar.id,
      ejemplar.libro_id,
      ejemplar.estado,
      ejemplar.ubicacion_detalle,
    ],
  );
};

export const updateEjemplar = async (ejemplar: Ejemplar): Promise<void> => {
  await run(
    "UPDATE ejemplares SET libro_id = ?, estado = ?, ubicacion_detalle = ? WHERE id = ?",
    [
      ejemplar.libro_id,
      ejemplar.estado,
      ejemplar.ubicacion_detalle,
      ejemplar.id,
    ],
  );
};
