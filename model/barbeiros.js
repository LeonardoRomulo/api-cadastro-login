class Barbeiros extends Usuarios {
    constructor(nome, email, senha, especialidade,is_adm, foto){
        super(nome, email, senha);
        this.especialidade = especialidade;
        this.is_adm = is_adm;
        this.foto = foto;
    }
}
export default Barbeiros;