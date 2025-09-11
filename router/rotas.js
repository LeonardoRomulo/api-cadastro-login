import valida from "../middleware/valida.js";
import UsuarioController from "../controller/usuarioController.js";
import { Router } from 'express';
import BarbeirosController from "../controller/barbeirosController.js";

const router = Router();
//rotas para usuários
router.post("/usuarios/login", UsuarioController.loginUsuario);
router.get("/usuarios", UsuarioController.listarUsuarios);
router.post("/usuarios/cadastro", valida , UsuarioController.criarUsuario);

//rotas para barbeiros
router.post("/barbeiros/cadastro", valida, BarbeirosController.criarBarbeiro);
router.post("/barbeiros/login", BarbeirosController.loginBarbeiro);
router.get("/barbeiros", BarbeirosController.listarBarbeiros);
router.patch("/barbeiros/:id",valida, BarbeirosController.atualizarBarbeiros );
router.delete("/barbeiros/:id", BarbeirosController.criarBarbeiro);
export default router;