import validaUsuario from "../middleware/validaUsuario.js";
import UsuarioController from "../controller/usuarioController.js";
import { Router } from 'express';

const router = Router();

router.post("/login", UsuarioController.loginUsuario);
router.get("/usuarios", UsuarioController.listarUsuarios);
router.post("/cadastro", validaUsuario, UsuarioController.criarUsuario);

export default router;