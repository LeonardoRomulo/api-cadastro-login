class Agendamentos {
    constructor (data_hora, barbeiro_id, usuario_id, servico_id, criado_em){
        this.data_hora = data_hora;
        this.barbeiro_id = barbeiro_id;
        this.usuario_id = usuario_id;
        this.servico_id = servico_id;
        this.criado_em = criado_em;
    }
}

export default Agendamentos;