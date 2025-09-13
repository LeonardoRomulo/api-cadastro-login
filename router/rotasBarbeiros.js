import BarbeirosController from "../controller/barbeirosController.js";
import valida from "../middleware/valida.js";
import { Router } from 'express';

const routerBarbeiros = Router();

routerBarbeiros.post("/barbeiros/cadastro", valida, BarbeirosController.criarBarbeiro);
routerBarbeiros.post("/barbeiros/login", BarbeirosController.loginBarbeiro);
routerBarbeiros.get("/barbeiros", BarbeirosController.listarBarbeiros);
routerBarbeiros.patch("/barbeiros/:id", valida, BarbeirosController.atualizarBarbeiros);
routerBarbeiros.delete("/barbeiros/:id", BarbeirosController.deletarBarbeiro);

export default routerBarbeiros;