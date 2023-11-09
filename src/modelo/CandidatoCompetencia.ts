import { v4 as uuidv4 } from 'uuid';


class CandidatoCompetencia {
     id!: number;
     idCandidato: number;
     idCompetencia: number;
     idNivelCompetencia: number;

    constructor( idCandidato: number, idCompetencia: number, idNivelCompetencia: number) {
    
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.idNivelCompetencia = idNivelCompetencia;
    }
}
export default CandidatoCompetencia;