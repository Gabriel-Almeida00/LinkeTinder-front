import Competencia from '../competencia';
import Formacao from '../formacao';
import Experiencia from '../experiencia';

export default class CandidatoDTO {
    descricaoPessoal: string;
    competencias: Competencia[];
    formacoes: Formacao[]; 
    experiencias: Experiencia[]; 

    constructor(
        descricaoPessoal: string,
        competencias: Competencia[],
        formacoes: Formacao[], 
        experiencias: Experiencia[] 
    ) {
        this.descricaoPessoal = descricaoPessoal;
        this.competencias = competencias;
        this.formacoes = formacoes; 
        this.experiencias = experiencias; 
    }
}
