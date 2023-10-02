import VagaCompetencia from '../VagaCompetencia';

export default class VagaDTO {
     id: string;
     nome: string;
     descricao: string;
     formacaoMinima: number;
     experienciaMinima: number;
     competencias: VagaCompetencia[];

    constructor(
        id: string,
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

    getVagas(): VagaCompetencia[] {
        return this.competencias
    }

    getFormacao():number{
        return this.formacaoMinima
    }

    getExperiencia():number{
        return this.experienciaMinima
    }

    getCompetencias(): VagaCompetencia[]{
        return this.competencias
    }

    getNome(): string{
        return this.nome
    }

    getDescricao(): string{
        return this.descricao
    }
}
