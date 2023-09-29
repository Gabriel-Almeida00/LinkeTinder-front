import Pessoa from "./Pessoa";
import Vaga from "./Vaga";
import TipoUsuario from "./enum/tipoUsuario";

class Empresa extends Pessoa {
     cnpj: string;
     vagas: Vaga[];

    constructor(
        nome: string,
        email: string,
        pais: string,
        cep: string,
        descricao: string,
        senha: string,
        cnpj: string,
        tipoUsuario: TipoUsuario.Empresa
    ) {
        super(nome, email, pais, cep, descricao, senha, tipoUsuario);
        this.cnpj = cnpj;
        this.vagas = [];
    }
    getVagas():Vaga[]{
        return this.vagas
    }
}

export default Empresa;
