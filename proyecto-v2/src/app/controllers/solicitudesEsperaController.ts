import { Request, Response } from "express";
import { executeCreateSolicitudEspera } from "../../use-cases/solicitudes-espera/createSolicitudEspera";
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

export const createSolicitudEsperaController = (
  req: Request,
  res: Response,
) => {
  try {
    const { estudiante_id, libro_id } = req.body || {};
    if (!estudiante_id || !libro_id) {
      return res.status(400).json({ error: "body_invalido" });
    }

    const solicitud = executeCreateSolicitudEspera({
      estudiante_id: String(estudiante_id),
      libro_id: String(libro_id),
    });

    return res.status(201).json(solicitud);
  } catch (error) {
    return handleError(res, error);
  }
};
