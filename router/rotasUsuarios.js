import valida from "../middleware/valida.js";
import UsuarioController from "../controller/usuarioController.js";
import { Router } from 'express';


const routerUsuarios = Router();
//rotas para usuários
routerUsuarios.post("/usuarios/login", UsuarioController.loginUsuario);
routerUsuarios.get("/usuarios", UsuarioController.listarUsuarios);
routerUsuarios.post("/usuarios/cadastro", valida , UsuarioController.criarUsuario);

export default routerUsuarios;