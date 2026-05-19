import { Request, Response } from "express";
import { executeGetLibroById } from "../../use-cases/libros/getLibroById";
import { executeListEjemplaresByLibro } from "../../use-cases/libros/listEjemplaresByLibro";
import { executeListLibros } from "../../use-cases/libros/listLibros";
import { executeCrearLibro } from "../../use-cases/libros/crearLibro";
import { executeCrearEjemplar } from "../../use-cases/libros/crearEjemplar";
import { AppError } from "../../shared/errors/AppError";

const parseDisponible = (value?: string) => {
  if (value === undefined) {
    return undefined;
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  return undefined;
};

const handleError = (res: Response, error: unknown) => {
  if (error instanceof AppError) {
    const payload = error.details
      ? { error: error.message, ...error.details }
      : { error: error.message };
    return res.status(error.statusCode).json(payload);
  }
  return res.status(500).json({ error: "internal_error" });
};

export const listLibrosController = async (req: Request, res: Response) => {
  try {
    const titulo = req.query.titulo
      ? String(req.query.titulo).toLowerCase()
      : undefined;
    const autor = req.query.autor
      ? String(req.query.autor).toLowerCase()
      : undefined;
    const sala = req.query.sala ? String(req.query.sala) : undefined;
    const disponible = parseDisponible(
      req.query.disponible ? String(req.query.disponible) : undefined,
    );

    const libros = await executeListLibros({ titulo, autor, sala, disponible });
    return res.json(libros);
  } catch (error) {
    return handleError(res, error);
  }
};

export const getLibroController = async (req: Request, res: Response) => {
  try {
    const libro = await executeGetLibroById(String(req.params.id));
    return res.json(libro);
  } catch (error) {
    return handleError(res, error);
  }
};

export const listEjemplaresByLibroController = async (
  req: Request,
  res: Response,
) => {
  try {
    const ejemplares = await executeListEjemplaresByLibro(
      String(req.params.id),
    );
    return res.json(ejemplares);
  } catch (error) {
    return handleError(res, error);
  }
};

export const crearLibroController = async (req: Request, res: Response) => {
  try {
    const libro = await executeCrearLibro(req.body);
    return res.status(201).json(libro);
  } catch (error) {
    return handleError(res, error);
  }
};

export const crearEjemplarController = async (req: Request, res: Response) => {
  try {
    const ejemplar = await executeCrearEjemplar(String(req.params.libroId), req.body);
    return res.status(201).json(ejemplar);
  } catch (error) {
    return handleError(res, error);
  }
};
