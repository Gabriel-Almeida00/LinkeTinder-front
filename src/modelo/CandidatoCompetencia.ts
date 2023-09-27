class CandidatoCompetencia {
    private id!: number;
    private idCandidato: number;
    private idCompetencia: string;
    private nivel: number;

    constructor(idCandidato: number, idCompetencia: string, nivel: number) {
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }

    obterId(): number {
        return this.id
    }

    getIdCompetencia():string{
        return this.idCompetencia
    }

    getNivel():number{
        return this.nivel
    }

    
}
export default CandidatoCompetencia;