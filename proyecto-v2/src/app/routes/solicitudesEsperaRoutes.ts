import { Router } from "express";
import { createSolicitudEsperaController } from "../controllers/solicitudesEsperaController";

const router = Router();

router.post("/solicitudes-espera", createSolicitudEsperaController);

export default router;
