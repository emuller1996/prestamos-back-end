import { Router } from "express";

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
import clientesRoutes from "./cliente.routes.js";
import prestamosRoutes from "./prestamos.routes.js";
import pagosRoutes from "./pagos.routes.js";



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/clientes", clientesRoutes);
router.use("/prestamos", prestamosRoutes);
router.use("/pagos", pagosRoutes);



export default router;