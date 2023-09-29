import VagaCompetencia from "./VagaCompetencia";
import VagaCurtida from "./VagaCurtida";
import { v4 as uuidv4 } from 'uuid';

class Vaga {
     id: string;
     idEmpresa: string;
     nome: string;
     descricao: string;
     cidade: string;
     formacaoMinima: number;
     experienciaMinima: number;
     competencias: VagaCompetencia[];
     curtida: VagaCurtida[];

    constructor(
        idEmpresa: string,
        nome: string,
        descricao: string,
        cidade: string,
        formacaoMinima: number,
        experienciaMinima: number
    ) {
        this.id = uuidv4();
        this.idEmpresa = idEmpresa;
        this.nome = nome;
        this.descricao = descricao;
        this.cidade = cidade;
        this.formacaoMinima = formacaoMinima;
        this.experienciaMinima = experienciaMinima;
        this.competencias = [];
        this.curtida = [];
    }

    obterId(): string {
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
