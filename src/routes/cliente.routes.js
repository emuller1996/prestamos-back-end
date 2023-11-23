import { Router } from "express";
import { getAllClientes,CreateClientes,getClienteById, UpdateClientes } from "../controllers/clienteController.js";

const sizeRouter = Router();

sizeRouter.get("/", getAllClientes);
sizeRouter.get("/:id", getClienteById);
sizeRouter.put("/:id", UpdateClientes);
sizeRouter.post("/", CreateClientes);

export default sizeRouter;

