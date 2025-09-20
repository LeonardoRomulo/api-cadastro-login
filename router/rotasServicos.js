import valida from "../middleware/valida.js";
import ServicosController from "../controller/servicosController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from 'express';

const routerServicos = Router();

routerServicos.post("/servicos/cadastro",authMiddleware, valida, ServicosController.criarServico);
routerServicos.get("/servicos", ServicosController.listarServicos);
routerServicos.patch("/servicos/:id",authMiddleware, valida, ServicosController.atualizarServicos);
routerServicos.delete("/servicos/:id",authMiddleware, ServicosController.deletarServico);

export default routerServicos;