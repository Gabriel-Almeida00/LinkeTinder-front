import VagaCompetencia from "./VagaCompetencia";
import VagaCurtida from "./VagaCurtida";
import { v4 as uuidv4 } from 'uuid';

class Vaga {
     id!: number;
     idEmpresa: number;
     nome: string;
     descricao: string;
     cidade: string;
     formacaoMinima: number;
     experienciaMinima: number;
     competencias: VagaCompetencia[];
     curtida: VagaCurtida[];

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
}

export default Vaga;
