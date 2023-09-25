class CompetenciaDTO{
    private id: number;
    private nome: string;
    private nivel: string;

    constructor(id: number, nome: string, nivel: string) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
    }
}
export default CompetenciaDTO