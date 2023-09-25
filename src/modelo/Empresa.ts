import Pessoa from "./Pessoa";
import Vaga from "./Vaga";

class Empresa extends Pessoa {
    private cnpj: string;
    private vagas: Vaga[];

    constructor(
        nome: string,
        email: string,
        pais: string,
        cep: string,
        descricao: string,
        senha: string,
        cnpj: string
    ) {
        super(nome, email, pais, cep, descricao, senha);
        this.cnpj = cnpj;
        this.vagas = [];
    }
    getVagas():Vaga[]{
        return this.vagas
    }
}

export default Empresa;
