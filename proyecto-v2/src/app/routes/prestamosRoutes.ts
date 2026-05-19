import { Router } from "express";
import {
  createPrestamoController,
  devolverPrestamoController,
  listPrestamosVencidosController,
  renovarPrestamoController,
} from "../controllers/prestamosController";

const router = Router();

router.post("/prestamos", createPrestamoController);
router.patch("/prestamos/:id/renovar", renovarPrestamoController);
router.put("/prestamos/:id/renovar", renovarPrestamoController);
router.patch("/prestamos/:id/devolver", devolverPrestamoController);
router.put("/prestamos/:id/devolucion", devolverPrestamoController);
router.get("/prestamos/vencidos", listPrestamosVencidosController);

export default router;
