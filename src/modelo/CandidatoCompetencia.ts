import { v4 as uuidv4 } from 'uuid';


class CandidatoCompetencia {
     id: string;
     idCandidato: string;
     idCompetencia: string;
     nivel: number;

    constructor(idCandidato: string, idCompetencia: string, nivel: number) {
        this.id = uuidv4();
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }
}
export default CandidatoCompetencia;