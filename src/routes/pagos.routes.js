import { Router } from "express";
import { getAllPagos } from "../controllers/pagosController.js";

const pagosRouter = Router();

pagosRouter.get("/", getAllPagos);


export default pagosRouter;
