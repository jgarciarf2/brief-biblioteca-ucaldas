import { Multa } from "../../../domain/entities/Multa";
import { all, get, run } from "./db";

export const listMultas = async (): Promise<Multa[]> => {
  return await all<Multa>("SELECT * FROM multas");
};

export const listMultasByUsuario = async (
  usuarioId: string,
): Promise<Multa[]> => {
  return await all<Multa>("SELECT * FROM multas WHERE usuario_id = ?", [
    usuarioId,
  ]);
};

export const addMulta = async (multa: Multa): Promise<void> => {
  await run(
    "INSERT INTO multas (id, prestamo_id, usuario_id, dias_retraso, valor_por_dia, valor_total, estado, fecha_generacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      multa.id,
      multa.prestamo_id,
      multa.usuario_id,
      multa.dias_retraso,
      multa.valor_por_dia,
      multa.valor_total,
      multa.estado,
      multa.fecha_generacion,
    ],
  );
};
