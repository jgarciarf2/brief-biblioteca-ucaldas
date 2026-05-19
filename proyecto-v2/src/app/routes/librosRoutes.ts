import { Router } from "express";
import {
  getLibroController,
  listEjemplaresByLibroController,
  listLibrosController,
  crearLibroController,
  crearEjemplarController,
} from "../controllers/librosController";

const router = Router();

router.get("/libros", listLibrosController);
router.get("/libros/:id", getLibroController);
router.get("/libros/:id/ejemplares", listEjemplaresByLibroController);
router.post("/libros", crearLibroController);
router.post("/libros/:libroId/ejemplares", crearEjemplarController);

export default router;
