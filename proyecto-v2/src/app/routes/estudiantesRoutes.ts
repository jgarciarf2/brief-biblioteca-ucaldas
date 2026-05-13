import { Router } from "express";
import {
  listHistorialPrestamosController,
  listMultasController,
  listPrestamosActivosController,
} from "../controllers/estudiantesController";

const router = Router();

router.get(
  "/estudiantes/:id/prestamos-activos",
  listPrestamosActivosController,
);
router.get(
  "/estudiantes/:id/historial-prestamos",
  listHistorialPrestamosController,
);
router.get("/estudiantes/:id/multas", listMultasController);

export default router;
