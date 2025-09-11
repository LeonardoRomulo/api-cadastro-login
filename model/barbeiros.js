import Usuario from "./usuario.js";
class Barbeiro extends Usuario {
    constructor(nome, email, senha, especialidade,is_adm, foto){
        super(nome, email, senha);
        this.especialidade = especialidade;
        this.is_adm = is_adm;
        this.foto = foto;
    }
}
export default Barbeiro;