import Pessoa from "./Pessoa";
import Vaga from "./Vaga";
import TipoUsuario from "./enum/TipoUsuario";

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
    ) {
        super(nome, email, pais, cep, descricao, senha);
        this.cnpj = cnpj;
        this.vagas = [];
    }

    setId(id: number):void{
        this.id = id
    }
}

export default Empresa;
