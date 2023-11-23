import { Router } from "express";
import {
  getAllPrestamos,
  createPrestamo,
  createPagoByPrestamo,
  getPrestamosById,
  getPagosByPrestamo,
} from "../controllers/prestamosController.js";

const prestamosRouter = Router();

prestamosRouter.get("/", getAllPrestamos);
prestamosRouter.get("/:id", getPrestamosById);
prestamosRouter.post("/", createPrestamo);
prestamosRouter.post("/:id/pagos", createPagoByPrestamo);
prestamosRouter.get("/:id/pagos", getPagosByPrestamo);

export default prestamosRouter;
