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

    static async listarAgendamentosBarbeiros(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const barbeiro_id = decode.id;

            //Verificar se o id foi passado
            if (!barbeiro_id) {
                return res.status(400).json({ message: "Id não passado" })
            };

            //Verificar se o id existe
            const [existe] = await conexao.query('SELECT id FROM barbeiros WHERE id = ?', [barbeiro_id]);

            if (existe.length === 0) {
                return res.status(400).json({ message: "ID não encontrado" });
            }
            const query = 'SELECT a.id, a.data_hora, a.status, s.nome AS servico, u.nome AS usuario FROM agendamentos a JOIN servicos s ON a.servico_id = s.id JOIN usuarios u ON a.usuario_id = u.id WHERE a.barbeiro_id = ? ORDER BY a.data_hora DESC';
            
            const [resultado] = await conexao.query(query, [barbeiro_id]);
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(500).json({ message: "Agendamento não encontraod", detalhe: err.message });
        }
    }

    static async listarAgendamentosUsuarios(req, res) {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const usuario_id = decode.id;

            //Validando se o id foi capturado corretamente
            if (!usuario_id) {
                return res.status(400).json({ message: "id não informado" });
            }

            //Validando se o id existe no banco de dados
            const [existe] = await conexao.query('SELECT id FROM usuarios WHERE id = ?', [usuario_id]);

            if (existe.length === 0) {
                return res.status(400).json({ message: "Id não encontrado" });
            }

            const query = 'SELECT a.id, a.data_hora, a.status, s.nome AS servico, b.nome AS barbeiro FROM agendamentos a JOIN servicos s ON a.servico_id = s.id JOIN barbeiros b ON a.barbeiro_id = b.id WHERE a.usuario_id = ? ORDER BY a.data_hora DESC';

            const [resultado] = await conexao.query(query, [usuario_id]);

            return res.status(200).json({ resultado });
        } catch (err) {
            return res.status(500).json({ message: "Agendamento não encontrado", detalhe: err.message });
        }
    }

    static async atualizarAgendamento(req, res) {

    }

    static async cancelarAgendamento(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ message: "ID não informado" });
            }
            const [existe] = await conexao.query('SELECT id FROM agendamentos WHERE id =?', [id]);

            if (existe.length === 0) {
                return res.status(400).json({ message: "Agendamento não encontrado" });
            }

            const query = 'UPDATE agendamentos SET status = ? WHERE id = ?';
            await conexao.query(query, ['cancelado', id]);

            return res.status(200).json({ message: "Agendamento cancelado com sucesso" });

        } catch (err) {
            return res.status(500).json({ message: "Erro ao cancelar o agendamento", detalhe: err.message });
        }
    }
}

export default AgendamentoController;
