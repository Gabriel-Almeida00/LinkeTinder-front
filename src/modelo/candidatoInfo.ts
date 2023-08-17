import Competencia from './competencia';

export default class CandidatoInfo {
    descricaoPessoal: string;
    competencias: Competencia[];

    constructor(descricaoPessoal: string, competencias: Competencia[]) {
        this.descricaoPessoal = descricaoPessoal;
        this.competencias = competencias;
    }
}