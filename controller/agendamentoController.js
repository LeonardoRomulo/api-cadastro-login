import conexao from "../model/conexao.js";
import Agendamento from "../model/agendamento.js";
import jwt from 'jsonwebtoken';

class AgendamentoController {
    static async criarAgendamento(req, res) {
        try {
            //Pega o token do header authorization
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ message: "Token não informado" });
            }
            //Decodifica o token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const usuario_id = decoded.id;

            const { data_hora, barbeiro_id, servico_id } = req.body;
            const agendamento = new Agendamento(data_hora, barbeiro_id, usuario_id, servico_id);
            const query = 'INSERT INTO agendamentos (data_hora, barbeiro_id, usuario_id,servico_id) VALUES (?, ?, ?, ?)';
            await conexao.query(query, [agendamento.data_hora, agendamento.barbeiro_id, agendamento.usuario_id, agendamento.servico_id]);
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

    static async cancelarAgendamento(req, res) {
        try {
            const {id} = req.params;

            if(!id){
                return res.status(400).json({message: "ID não informado"});
            }
            const [existe] = await conexao.query('SELECT id FROM agendamentos WHERE id =?', [id]);

            if(existe.length === 0){
                return res.status(400).json({message:"Agendamento não encontrado"});
            }

            const query = 'UPDATE agendamentos SET status = ? WHERE id = ?';
            await conexao.query(query, ['cancelado', id]);

            return res.status(200).json({message: "Agendamento cancelado com sucesso"});

        } catch (err) {
            return res.status(500).json({message: "Erro ao cancelar o agendamento", detalhe: err.message});
        }
    }
}

export default AgendamentoController;
