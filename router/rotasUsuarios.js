import valida from "../middleware/valida.js";
import UsuarioController from "../controller/usuarioController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from 'express';


const routerUsuarios = Router();
//rotas para usuários
routerUsuarios.post("/usuarios/login", UsuarioController.loginUsuario);
routerUsuarios.get("/usuarios", authMiddleware, UsuarioController.listarUsuarios);
routerUsuarios.post("/usuarios/cadastro", valida , UsuarioController.criarUsuario);

export default routerUsuarios;