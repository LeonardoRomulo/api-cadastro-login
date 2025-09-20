import valida from "../middleware/valida.js";
import AgendamentoController from "../controller/agendamentoController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { Router } from 'express';

const routerAgendamentos = Router();

routerAgendamentos.post("/agendamentos/agendar",authMiddleware, valida, AgendamentoController.criarAgendamento);
routerAgendamentos.get("/agendamentos",authMiddleware, AgendamentoController.listarAgendamentosBarbeiros);
routerAgendamentos.get("/agendamentos",authMiddleware, AgendamentoController.listarAgendamentosUsuarios);
routerAgendamentos.patch("/agendamentos/:id",authMiddleware, valida, AgendamentoController.atualizarAgendamento);
routerAgendamentos.delete("/agendamentos/:id", authMiddleware, AgendamentoController.cancelarAgendamento);

export default routerAgendamentos;