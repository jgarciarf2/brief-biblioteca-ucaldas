import { Router } from "express";
import {
  getLibroController,
  listEjemplaresByLibroController,
  listLibrosController,
  crearLibroController,
} from "../controllers/librosController";

const router = Router();

router.get("/libros", listLibrosController);
router.get("/libros/:id", getLibroController);
router.get("/libros/:id/ejemplares", listEjemplaresByLibroController);
router.post("/libros", crearLibroController);

export default router;
