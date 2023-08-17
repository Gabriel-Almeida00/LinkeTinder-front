import Vaga from "./vaga";

class Empresa {
    nome: string;
    email: string;
    cep: string;
    cnpj: string;
    pais: string;
    estado: string;
    descricaoEmpresa: string;
    vagas: Vaga[];

    constructor(nome: string, email: string, cep: string, cnpj: string, pais: string, estado: string, descricaoEmpresa: string, vagas: Vaga[]) {
        this.nome = nome;
        this.email = email;
        this.cep = cep
        this.cnpj = cnpj;
        this.pais = pais;
        this.estado = estado;
        this.descricaoEmpresa = descricaoEmpresa;
        this.vagas = vagas;
    }
}

export default Empresa;
