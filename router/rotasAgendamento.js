import valida from "../middleware/valida.js";
import AgendamentoController from "../controller/agendamentoController.js";
import { Router } from 'express';

const routerAgendamentos = Router();

routerAgendamentos.post("/agendamentos", valida, AgendamentoController.criarAgendamento);
routerAgendamentos.get("/agendamentos", AgendamentoController.listarAgendamentos);
routerAgendamentos.patch("/agendamentos/:id", AgendamentoController.atualizarAgendamento);
routerAgendamentos.delete("/agendamentos/:id", AgendamentoController.deletarAgendamento);

export default routerAgendamentos;