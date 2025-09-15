import conexao from "../model/conexao.js";
import Agendamento from "../model/agendamento.js";

class AgendamentoController {
    static async criarAgendamento(req, res) {
        try {
            const { data_hora, barbeiro_id, usuario_id, criado_em, servico_id } = req.body;
            const agendamento = new Agendamento(data_hora, barbeiro_id, usuario_id, servico_id, criado_em);
            const query = 'INSERT INTO agendamentos (data_hora, barbeiro_id, usuario_id,servico_id, criado_em) VALUES (?, ?, ?, ?)';
            await conexao.query(query, [agendamento.data_hora, agendamento.barbeiro_id, agendamento.usuario_id,agendamento.servico_id, agendamento.criado_em]);
            return res.status(200).json({ message: "Agendamento feito com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao fazer agendamento", detalhe: err.message });
        }
    }

    static async listarAgendamentos(req, res) {
        // Implementação futura
    }

    static async atualizarAgendamento(req, res) {
        // Implementação futura
    }

    static async deletarAgendamento(req, res) {
        // Implementação futura
    }
}

export default AgendamentoController;
