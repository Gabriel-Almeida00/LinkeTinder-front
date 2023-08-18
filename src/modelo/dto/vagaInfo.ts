import Competencia from '../competencia';

export default class VagaInfo {
    titulo: string;
    descricao: string;
    experienciaMinima: string;
    formacaoMinima: string;
    requisitos: Competencia[];

    constructor(
        titulo: string,
        descricao: string,
        experienciaMinima: string,
        formacaoMinima: string,
        requisitos: Competencia[]
    ) {
        this.titulo = titulo;
        this.descricao = descricao;
        this.experienciaMinima = experienciaMinima;
        this.formacaoMinima = formacaoMinima;
        this.requisitos = requisitos;
    }
}
