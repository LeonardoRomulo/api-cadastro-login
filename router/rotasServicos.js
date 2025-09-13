import valida from "../middleware/valida.js";
import ServicosController from "../controller/servicosController.js";
import { Router } from 'express';

const routerServicos = Router();

routerServicos.post("/servicos/cadastro", valida, ServicosController.criarServico);
routerServicos.get("/servicos", ServicosController.listarServicos);
routerServicos.patch("/servicos/:id", valida, ServicosController.atualizarServicos);
routerServicos.delete("/servicos/:id", ServicosController.deletarServico);

export default routerServicos;