import CandidatoCompetencia from '../CandidatoCompetencia';
import Experiencia from '../Experiencia';
import Formacao from '../Formacao';

export default class CandidatoDTO {
     id!: string;
     nome: string;
     descricao: string;
     competencias: CandidatoCompetencia[];
     experiencias: Experiencia[]
     formacoes: Formacao[]

    constructor(
        id: string,
        nome: string,
        descricao: string,
        competencias: CandidatoCompetencia[],
        experiencias: Experiencia[],
        formacoes: Formacao[]
        ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.competencias = competencias;
        this.experiencias = experiencias;
        this.formacoes = formacoes;
    }
}
