import Competencia from "./competencia";

class Vaga {
    nome: string;
    descricao: string;
    requisitos: Competencia[];

    constructor(nome: string, descricao: string, requisitos: Competencia[]) {
        this.nome = nome;
        this.descricao = descricao;
        this.requisitos = requisitos;
    }
}

export default Vaga;
