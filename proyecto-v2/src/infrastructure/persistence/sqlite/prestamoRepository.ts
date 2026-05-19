import { Prestamo } from "../../../domain/entities/Prestamo";
import { all, get, run } from "./db";

export const listPrestamos = async (): Promise<Prestamo[]> => {
  return await all<Prestamo>("SELECT * FROM prestamos");
};

export const findPrestamoById = async (
  id: string,
): Promise<Prestamo | null> => {
  return await get<Prestamo>("SELECT * FROM prestamos WHERE id = ?", [id]);
};

export const addPrestamo = async (prestamo: Prestamo): Promise<void> => {
  await run(
    "INSERT INTO prestamos (id, usuario_id, ejemplar_id, fecha_prestamo, fecha_devolucion_esperada, fecha_devolucion_real, estado, renovaciones) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      prestamo.id,
      prestamo.usuario_id,
      prestamo.ejemplar_id,
      prestamo.fecha_prestamo,
      prestamo.fecha_devolucion_esperada,
      prestamo.fecha_devolucion_real,
      prestamo.estado,
      prestamo.renovaciones,
    ],
  );
};

export const updatePrestamo = async (prestamo: Prestamo): Promise<void> => {
  await run(
    "UPDATE prestamos SET usuario_id = ?, ejemplar_id = ?, fecha_prestamo = ?, fecha_devolucion_esperada = ?, fecha_devolucion_real = ?, estado = ?, renovaciones = ? WHERE id = ?",
    [
      prestamo.usuario_id,
      prestamo.ejemplar_id,
      prestamo.fecha_prestamo,
      prestamo.fecha_devolucion_esperada,
      prestamo.fecha_devolucion_real,
      prestamo.estado,
      prestamo.renovaciones,
      prestamo.id,
    ],
  );
};
