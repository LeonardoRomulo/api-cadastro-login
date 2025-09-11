import Barbeiro from "../model/barbeiros";
import conexao from "../model/conexao";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class BarbeirosController {
    static async criarUsuarios(req, res) {
        try {
            const { nome, email, senha, especialidade, is_adm, foto } = req.body;
            const senhaHash = await bcrypt.hash(senha, 10);
            const barbeiro = new Barbeiro(nome, email, senha, especialidade, is_adm, foto);
            const query = "INSERT INTO barbeiros (nome, email, senha, especialidade, is_adm, foto) VALUES (?, ?, ?, ?, ?, ?)";
            await conexao.query(query, [barbeiro.nome, barbeiro.email, barbeiro.senha, barbeiro.senha, barbeiro.especialidades, barbeiro.is_adm, barbeiro.foto]);
            return res.status(200).json({ message: "Cadastro criado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }
}
export default BarbeirosController;