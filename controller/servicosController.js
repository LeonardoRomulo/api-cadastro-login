import conexao from "../model/conexao.js";
import Servicos from "../model/servicos.js";

class ServicosController {

    static async criarServico(req, res) {
        try {
            const { nome, descricao, preco } = req.body;
            const servicos = new Servicos(nome, descricao, preco);
            const query = 'INSERT INTO servicos (nome, descricao, preco) VALUES (?, ?, ?)';
            await conexao.query(query, [servicos.nome, servicos.descricao, servicos.preco]);
            return res.status(200).json({ message: "Serviço criado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao criar o novo serviço", detalhe: err.message });
        }
    }

    static async listarServicos(req, res) {
        try {
            const query = 'SELECT nome, descricao, preco FROM servicos';
            const [resultado] = await conexao.query(query);
            return res.status(200).json(resultado);
        } catch (err) {
            return res.status(500).json({ message: "Erro ao listar os serviços", detalhe: err.message });
        }
    }

    static async atualizarServicos(req, res) {
        try {
            const { id } = req.params;
            const { nome, descricao, preco } = req.body;
            //montando um objeto com os campos  passados no corpo de requisição para atualizar
            const camposBody = { nome, descricao, preco };
            //montagem dos array campos e valores inicialmente vazios pois será atualizado com o loop apenas com os campos e valores que precisam ser atualizados
            let campos = [];
            let valores = [];

            //Loop que percorre os campos enviados e adiciona apenas os que não são undefined nos arrays campos e valores
            for (const [campo, valor] of Object.entries(camposBody)) {
                if(valor !== undefined){
                    campos.push(`${campo} = ?`);
                    valores.push(valor)
                }
            }
            //Confere se o array campos está vazio se sim retorna o erro se não continua o fluxo do metódo
            if(campos.length === 0){
                return res.status(400).json({message:""});
            }
            //Adiciona o id que será atualizado no fim do array valores
            valores.push(id);
            //montada a query apenas com os valores que serão atualizados dinâmicamente
            const query =` UPDATE servicos SET ${campos.join(", ")}  WHERE id =?`;
            //Chamada da query com os valores dinâmicos
            await conexao.query(query, valores);
            return res.status(200).json({ message: "Serviço atualizado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao atualizar o serviço", detalhe: err.message });
        }
    }

    static async deletarServico(req, res) {
        try {
            const { id } = req.params;
            //Verifica se o id foi informado na requisição
            if (!id) {
                res.status(400).json({ message: " ID não informado" });
            };

            //Verificando se o serviço existe no bd
            const [existe] = await conexao.query('SELECT id FROM servicos WHERE id = ?', [id]);

            if (existe.length === 0) {
                return res.status(400).json({ message: "Serviço não encontrado" });
            }

            const query = 'DELETE FROM servicos WHERE id = ?';
            await conexao.query(query, [id]);
            return res.status(200).json({ message: "Serviço deletado com sucesso" });
        } catch (err) {
            return res.status(500).json({ message: "Erro ao deletar o serviço", detalhe: err.message });
        }
    }
};
export default ServicosController;
