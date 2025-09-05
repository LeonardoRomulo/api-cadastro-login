import validaUsuario from "../middleware/validaUsuario.js";
import UsuarioController from "../controller/usuarioController.js";
import { Router } from 'express';

const router = Router();

router.post("/login", validaUsuario, UsuarioController.loginUsuario);
router.get("/usuarios", UsuarioController.listarUsuarios);

export default router;