import conexao from "../model/conexao";
import Usuario from "../model/usuario";

class UsuarioController {

    static async criarUsuario (req,res){
        try{
            const {nome, email, cpf, senha} = req.body;
            const usuario = new Usuario(nome, email, cpf, senha);
            const query = 'INSERT INTO usuarios (nome, email, cpf, senha) VALUES (?, ?, ?, ?)';
            await conexao.query(query, [usuario.nome, usuario.email, usuario.cpf, usuario.senha]);
            return res.status(200).json({message:"Usuário criado com sucesso"});
        }catch(err){
            return res.status(400).json({message: err.messge});
        }
    };
}

export default UsuarioController;