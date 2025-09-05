import conexao from "../model/conexao.js";
import Usuario from "../model/usuario.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';


dotenv.config();

class UsuarioController {
    //Metódo para criar um novo usuário
    static async criarUsuario(req, res) {
        try {
            const { nome, email, cpf, senha } = req.body; //captura os parâmetros digitados pelo usuário do corpo da requisição.
            const senhaHash = await bcrypt.hash(senha, 10); //salva a senha em hash no banco de dados com o nível de segurança 10 que é o padrão.
            const usuario = new Usuario(nome, email, cpf, senhaHash); // Cria um novo usuário
            const query = 'INSERT INTO usuarios (nome, email, cpf, senha) VALUES (?, ?, ?, ?)'; // query para cadastrar o usuário no banco de dados com placeholders
            await conexao.query(query, [usuario.nome, usuario.email, usuario.cpf, usuario.senha]); //executa a query com o statement para evitar query injection
            return res.status(200).json({ message: "Usuário criado com sucesso" }); //retorna a mensagem de sucesso avisando que o usuário foi criado com sucesso caso passe na validação do middleware
        } catch (err) {
            return res.status(400).json({ message: err.messge }); //retorno da mensagem de erro caso falhe na validação
        }
    };

    //metódo para realizar o login
    static async loginUsuario(req, res) {
        try {
            const { email, senha } = req.body; // captura email e senha digitado pelo usuário no copro da requisição
            //autenticação do email
            const query = 'SELECT * FROM usuarios WHERE email =?'; //  query que compara se o email digitado existe no banco de dados
            const [resultado] = await conexao.query(query, [email]); //execução da query que compara se o email existe no bd se sim ele pega a primeira aparição do email e salva em resultado se não houver ele deixa a costante vazia

            //Condicional de validação do email, se a costante resultado tiver o tamanho igual a 0 retorna o status 401 e a mensagem de erro
            if (resultado.length === 0) {
                return res.status(401).json({ error: "Email ou senha inválida" });
            }
            //autenticação da senha

            const usuario = resultado[0]; //captura o primeiro usuário no bd com o email informado pelo usuario
            const senhaValida = await bcrypt.compare(senha, usuario.senha);//comparação da senha digitada pelo usuário com o hash da senha no bd usando o bcrypt


            if (!senhaValida) {
                return res.status(401).json({ error: "Email ou senha inválida" });
            } //Se a senha for inválida retorna o status 401 e a mensagem de erro

            //Se a senha for válida o fluxo do código continua para gerar o token jwt abaixo

            //configuração do token jwt de autenticação do usuário

            const segredo = process.env.JWT_SECRET; //Pega a chave secreta na variável de ambiente

            const token = jwt.sign(
                { id: usuario.id, email: usuario.email }, // dados do usuário que vão dentro do token
                segredo, // chave secreta
                { expiresIn: "1h" } // tempo que o token expira
            ); // Cria o token jwt 
            //retorno da menssagem de sucesso caso email e senha esteja corretos
            return res.status(200).json({ message: "Login realizado com sucesso", token });
        } catch (err) {
            //retorno da mensagem de erro caso o email ou a senha falher na autenticação do usuário
            return res.status(500).json({ message: "Erro ao realizar login", detalhes: err.message });
        }
    };

    static async listarUsuarios(req, res) {
        try {
            const query = 'SLECT * FROM usuarios';
            const [usuarios] = await conexao.query(query);
            res.status(200).json(usuarios);
        } catch (err) {
            return res.status(500).json({ message: "Erro ao listar usuários" });
        }
    };
}

export default UsuarioController;