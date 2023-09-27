import { v4 as uuidv4 } from 'uuid';


class CandidatoCompetencia {
    private id: string;
    private idCandidato: string;
     idCompetencia: string;
     nivel: number;

    constructor(idCandidato: string, idCompetencia: string, nivel: number) {
        this.id = uuidv4();
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }

    obterId(): string {
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