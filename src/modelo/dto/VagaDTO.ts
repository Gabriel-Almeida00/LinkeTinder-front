import VagaCompetencia from '../VagaCompetencia';

export default class VagaDTO {
    private id: number;
    private nome: string;
    private descricao: string;
    private formacaoMinima: number;
    private experienciaMinima: number;
    private competencias: VagaCompetencia[];

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

    getVagas(): VagaCompetencia[] {
        return this.competencias
    }

    getFormacao():number{
        return this.formacaoMinima
    }

    getExperiencia():number{
        return this.experienciaMinima
    }
}
