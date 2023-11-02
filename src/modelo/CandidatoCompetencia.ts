import { v4 as uuidv4 } from 'uuid';


class CandidatoCompetencia {
     id: string;
     idCandidato: number;
     idCompetencia: string;
     nivel: number;

    constructor(idCandidato: number, idCompetencia: string, nivel: number) {
        this.id = uuidv4();
        this.idCandidato = idCandidato;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }
}
export default CandidatoCompetencia;