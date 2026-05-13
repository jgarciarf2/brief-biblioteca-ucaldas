import { Router } from "express";
import {
  getLibroController,
  listEjemplaresByLibroController,
  listLibrosController,
} from "../controllers/librosController";

const router = Router();

router.get("/libros", listLibrosController);
router.get("/libros/:id", getLibroController);
router.get("/libros/:id/ejemplares", listEjemplaresByLibroController);

export default router;
