import CandidatoCompetencia from '../CandidatoCompetencia';

export default class CandidatoDTO {
    private id!: number;
    private nome: string;
    private descricao: string;
    private competencias: CandidatoCompetencia[];

    constructor(id: number, nome: string, descricao: string, competencias: CandidatoCompetencia[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.competencias = competencias;
    }
}
