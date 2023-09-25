import VagaCompetencia from '../VagaCompetencia';

export default class VagaDTO {
    private id: number;
    private nome: string;
    private descricao: string;
    private competencias: VagaCompetencia[];

    constructor(id: number, nome: string, descricao: string, competencias: VagaCompetencia[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.competencias = competencias;
    }
}
