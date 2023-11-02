import VagaCompetencia from '../VagaCompetencia';

export default class VagaDTO {
     id: number;
     nome: string;
     descricao: string;
     formacaoMinima: number;
     experienciaMinima: number;
     competencias: VagaCompetencia[];

    constructor(
        id: number,
        nome: string,
        descricao: string,
        formacaoMinima: number,
        experienciaMinima: number,
        competencias: VagaCompetencia[]
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.formacaoMinima = formacaoMinima;
        this.experienciaMinima = experienciaMinima;
        this.competencias = competencias;
    }
}
