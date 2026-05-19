import { Request, Response } from "express";
import { executeCreatePrestamo } from "../../use-cases/prestamos/createPrestamo";
import { executeDevolverPrestamo } from "../../use-cases/prestamos/devolverPrestamo";
import { executeListPrestamosVencidos } from "../../use-cases/prestamos/listPrestamosVencidos";
import { executeRenovarPrestamo } from "../../use-cases/prestamos/renovarPrestamo";
import { AppError } from "../../shared/errors/AppError";

const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    const payload = error.details
      ? { error: error.message, ...error.details }
      : { error: error.message };
    return res.status(error.statusCode).json(payload);
  }
  return res.status(500).json({ error: "internal_error" });
};

export const createPrestamoController = async (req: Request, res: Response) => {
  try {
    const { estudiante_id, ejemplar_id } = req.body || {};
    if (!estudiante_id || !ejemplar_id) {
      return res.status(400).json({ error: "body_invalido" });
    }

    const prestamo = await executeCreatePrestamo({
      estudiante_id: String(estudiante_id),
      ejemplar_id: String(ejemplar_id),
    });

    return res.status(201).json(prestamo);
  } catch (error) {
    return handleError(res, error);
  }
};

export const renovarPrestamoController = async (
  req: Request,
  res: Response,
) => {
  try {
    const prestamo = await executeRenovarPrestamo(String(req.params.id));
    return res.json(prestamo);
  } catch (error) {
    return handleError(res, error);
  }
};

export const devolverPrestamoController = async (
  req: Request,
  res: Response,
) => {
  try {
    const fecha = req.body?.fecha_devolucion_real;
    const resultado = await executeDevolverPrestamo(
      String(req.params.id),
      fecha ? String(fecha) : undefined,
    );
    return res.json(resultado);
  } catch (error) {
    return handleError(res, error);
  }
};

export const listPrestamosVencidosController = async (
  req: Request,
  res: Response,
) => {
  try {
    const estudianteId = req.query.estudiante_id
      ? String(req.query.estudiante_id)
      : undefined;
    const prestamos = await executeListPrestamosVencidos(estudianteId);
    return res.json(prestamos);
  } catch (error) {
    return handleError(res, error);
  }
};
