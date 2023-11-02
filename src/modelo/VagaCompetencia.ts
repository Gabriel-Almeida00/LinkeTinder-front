import { v4 as uuidv4 } from 'uuid';


class VagaCompetencia{
     id: string;
     idVaga: number;
     idCompetencia: string;
     nivel: number;

    constructor(idVaga: number, idCompetencia: string, nivel: number) {
        this.id = uuidv4();
        this.idVaga = idVaga;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }
}
export default VagaCompetencia