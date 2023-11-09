import VagaCompetencia from "./VagaCompetencia";
import VagaCurtida from "./VagaCurtida";

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
