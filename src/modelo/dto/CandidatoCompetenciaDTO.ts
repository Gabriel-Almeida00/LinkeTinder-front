class CompetenciaDTO{
    id: number;
    nome: string;
    nivel: string;

    constructor(id: number, nome: string, nivel: string) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
    }
}
export default CompetenciaDTO;