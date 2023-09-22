import Competencia from '../competencia';

export default class VagaDTO {
    nome: string;
    descricao: string;
    experienciaMinima: string;
    formacaoMinima: string;
    requisitos: Competencia[];

    constructor(
        nome: string,
        descricao: string,
        experienciaMinima: string,
        formacaoMinima: string,
        requisitos: Competencia[]
    ) {
        this.nome = nome;
        this.descricao = descricao;
        this.experienciaMinima = experienciaMinima;
        this.formacaoMinima = formacaoMinima;
        this.requisitos = requisitos;
    }

    
}
