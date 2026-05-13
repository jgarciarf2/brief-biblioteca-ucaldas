import { Router } from "express";
import librosRoutes from "./librosRoutes";
import prestamosRoutes from "./prestamosRoutes";
import estudiantesRoutes from "./estudiantesRoutes";
import solicitudesEsperaRoutes from "./solicitudesEsperaRoutes";

const router = Router();

router.use(librosRoutes);
router.use(prestamosRoutes);
router.use(estudiantesRoutes);
router.use(solicitudesEsperaRoutes);

export default router;
