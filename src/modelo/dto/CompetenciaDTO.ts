class CompetenciaDTO{
     id: string;
     nome: string;
     nivel: string;

    constructor(id: string, nome: string, nivel: string) {
        this.id = id;
        this.nome = nome;
        this.nivel = nivel;
    }
}
export default CompetenciaDTO