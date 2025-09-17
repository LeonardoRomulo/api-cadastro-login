import valida from "../middleware/valida.js";
import AgendamentoController from "../controller/agendamentoController.js";
import { Router } from 'express';

const routerAgendamentos = Router();

routerAgendamentos.post("/agendamentos/agendar", valida, AgendamentoController.criarAgendamento);
routerAgendamentos.get("/agendamentos", AgendamentoController.listarAgendamentosBarbeiros);
routerAgendamentos.get("/agendamentos", AgendamentoController.listarAgendamentosUsuarios);
routerAgendamentos.patch("/agendamentos/:id",valida, AgendamentoController.atualizarAgendamento);
routerAgendamentos.delete("/agendamentos/:id", AgendamentoController.cancelarAgendamento);

export default routerAgendamentos;