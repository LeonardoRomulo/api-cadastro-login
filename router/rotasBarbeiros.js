import BarbeirosController from "../controller/barbeirosController.js";
import valida from "../middleware/valida.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from 'express';

const routerBarbeiros = Router();

routerBarbeiros.post("/barbeiros/cadastro", valida, BarbeirosController.criarBarbeiro);
routerBarbeiros.post("/barbeiros/login", BarbeirosController.loginBarbeiro);
routerBarbeiros.get("/barbeiros", authMiddleware, BarbeirosController.listarBarbeiros);
routerBarbeiros.patch("/barbeiros/:id",authMiddleware, valida, BarbeirosController.atualizarBarbeiros);
routerBarbeiros.delete("/barbeiros/:id",authMiddleware, BarbeirosController.deletarBarbeiro);

export default routerBarbeiros;