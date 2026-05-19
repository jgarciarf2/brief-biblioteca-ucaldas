import { Request, Response } from "express";
import { executeListHistorialPrestamos } from "../../use-cases/estudiantes/listHistorialPrestamos";
import { executeListMultas } from "../../use-cases/estudiantes/listMultas";
import { executeListPrestamosActivos } from "../../use-cases/estudiantes/listPrestamosActivos";
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

export const listPrestamosActivosController = async (
  req: Request,
  res: Response,
) => {
  try {
    const prestamos = await executeListPrestamosActivos(String(req.params.id));
    return res.json(prestamos);
  } catch (error) {
    return handleError(res, error);
  }
};

export const listHistorialPrestamosController = async (
  req: Request,
  res: Response,
) => {
  try {
    const estado = req.query.estado ? String(req.query.estado) : undefined;
    const desde = req.query.desde ? String(req.query.desde) : undefined;
    const hasta = req.query.hasta ? String(req.query.hasta) : undefined;

    const prestamos = await executeListHistorialPrestamos({
      usuarioId: String(req.params.id),
      estado,
      desde,
      hasta,
    });

    return res.json(prestamos);
  } catch (error) {
    return handleError(res, error);
  }
};

export const listMultasController = async (req: Request, res: Response) => {
  try {
    const estado = req.query.estado ? String(req.query.estado) : undefined;
    const multas = await executeListMultas(String(req.params.id), estado);
    return res.json(multas);
  } catch (error) {
    return handleError(res, error);
  }
};
