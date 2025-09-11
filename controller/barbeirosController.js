import Barbeiro from "../model/barbeiros";
import conexao from "../model/conexao";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

class BarbeirosController {
    static async criarBarbeiro(req, res) {
        try {
            const { nome, email, senha, especialidade, is_adm, foto } = req.body;
            //Verifica se o email já existe no bd
            const [existe] = await conexao.query('SELECT id FROM barbeiros WHERE email = ?',[email]);
            if(existe.length > 0){
                return res.status(409).json({message: "Email já existe"});
            }
            const senhaHash = await bcrypt.hash(senha, 10);
            const barbeiro = new Barbeiro(nome, email, senhaHash, especialidade, is_adm, foto);
            const query = "INSERT INTO barbeiros (nome, email, senha, especialidade, is_adm, foto) VALUES (?, ?, ?, ?, ?, ?)";
            await conexao.query(query, [barbeiro.nome, barbeiro.email, barbeiro.senha, barbeiro.especialidade, barbeiro.is_adm, barbeiro.foto]);
            return res.status(200).json({ message: "Cadastro criado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    static async loginBarbeiro(req, res) {
        try {
            //captura do email e senha digitado pelo cliente no corpo de requisição 
            const { email, senha } = req.body;
            //Validação do email e da senha 
            if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}(\.[^\s@]{2,})?$/.test(email.trim())) {
                return res.status(400).json({ message: "Email inválido" });
            };

            if (!senha || typeof senha !== 'string' || !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(senha.trim())) {
                return res.status(400).json({ message: "Senha inválida" });
            };
            //query que verifica se o email informado pelo cliente tem uma correspodência no bd
            const query = 'SELECT * FROM barbeiros WHERE email = ?';
            //Execução da query, caso haja correspodencia entre o email do cliente e do bd pega a primeira aparição e salva na costante resultado
            const [resultado] = await conexao.query(query, [email]);
            // validação do email caso não haja correspodência ele retorna a mensagem de erro abaixo
            if(resultado.length === 0){
                return res.status(401).json({ error: "Email ou senha inválida"});
            }

            //autenticação da senha

            //Captura o primeiro barbeiro no bd que o email informado pelo cliente corresponda com o bd
            const barbeiro =  resultado[0];
            
            //Compara a senha digitada pelo cliente com o hash da senha no bd usando o bcrypt
            const senhaValida = await bcrypt.compare(senha, barbeiro.senha);

            //valida a credencial da senha
            if(!senhaValida){
                return res.status(401).json({ error: "Email ou senha inválida"});
            };

            //Configuração do token jwt

            const segredo = process.env.JWT_SECRET;

            const token = jwt.sign(
                {id: barbeiro.id, email: barbeiro.email},
                segredo,
                {expiresIn: "1h"}
            );

            return res.status(200).json({ message: "Barbeiro logado com sucesso", token });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao realizar o login", detalhe: err.message })
        }
    };


    static async listarBarbeiros(req, res) {
        try {
            const query = 'SELECT * FROM barbeiros';
            const [resultado] = await conexao.query(query);
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };

    static async atualizarBarbeiros(req,res){// utilizar a rota patch
        try {
            const {id} = req.params;
            const { nome, email, senha, especialidade, foto } = req.body;

            const camposBody = {nome, email, especialidade, foto};
            let campos =[];
            let valores =[];

            for(const[campo, valor] of Object.entries(camposBody)){
                if(valor !=='undefined') {
                    campos.push(`${campo} = ?`);
                    valores.push(valor);
                }
            }

            if(senha){
                const senhaHash = await bcrypt.hash(senha,10);
                campos.push("senha = ?");
                valores.push(senhaHash)
            };

            if(campos.length === 0) {
                return res.status(400).json({message: "Nenhum campo para atualizar"});
            };

            valores.push(id)

            const query = `UPDATE barbeiros SET ${campos.join(", ")} WHERE id =?`;
            await conexao.query(query, valores)
            res.status(200).json({message: "Barbeiro atualizado com sucesso"});
        } catch (err) {
            res.status(500).json({message: err.message});
        }
    }
}
export default BarbeirosController;