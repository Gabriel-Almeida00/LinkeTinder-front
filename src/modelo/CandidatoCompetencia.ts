class CandidatoCompetencia {
    private id!: number;
    private idCandidato: number;
    private idCompetencia: number;
    private nivel: number;

    constructor(idCandidato: number, idCompetencia: number, nivel: number) {
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }

    obterId(): number {
        return this.id
    }

    getNivel():number{
        return this.nivel
    }

    
}
export default CandidatoCompetencia;