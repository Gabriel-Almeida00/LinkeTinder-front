import Competencia from "./competencia";
import NivelExperiencia from "./enum/nivelExperiencia";
import NivelFormacao from "./enum/nivelFormacao";

class Vaga {
    nome: string;
    descricao: string;
    requisitos: Competencia[];
    formacaoMinima: NivelFormacao;
    experienciaMinima: NivelExperiencia;

    constructor(nome: string, descricao: string, requisitos: Competencia[], formacaoMinima: NivelFormacao,experienciaMinima: NivelExperiencia) {
        this.nome = nome;
        this.descricao = descricao;
        this.requisitos = requisitos;
        this.formacaoMinima = formacaoMinima;
        this.experienciaMinima = experienciaMinima;
    }
}

export default Vaga;
