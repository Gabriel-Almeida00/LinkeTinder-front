import VagaCompetencia from "./VagaCompetencia";
import VagaCurtida from "./VagaCurtida";


class Vaga {
    private id!: number;
    private idEmpresa: number;
    private nome: string;
    private descricao: string;
    private cidade: string;
    private formacaoMinima: number;
    private experienciaMinima: number;
    private competencias: VagaCompetencia[];
    private curtida: VagaCurtida[];

    constructor(
        idEmpresa: number,
        nome: string,
        descricao: string,
        cidade: string,
        formacaoMinima: number,
        experienciaMinima: number
    ) {
        this.idEmpresa = idEmpresa;
        this.nome = nome;
        this.descricao = descricao;
        this.cidade = cidade;
        this.formacaoMinima = formacaoMinima;
        this.experienciaMinima = experienciaMinima;
        this.competencias = [];
        this.curtida = [];
    }

    obterId(): number {
        return this.id
    }

    getCompetencias(): VagaCompetencia[] {
        return this.competencias
    }

    getExperiencia(): number {
        return this.experienciaMinima
    }

    getFormacao(): number {
        return this.formacaoMinima
    }

    getNome(): string {
        return this.nome
    }

    getDescricao():string{
        return this.descricao
    }
}

export default Vaga;
