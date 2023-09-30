import { v4 as uuidv4 } from 'uuid';


class VagaCompetencia{
    private id: string;
    private idVaga: number;
    private idCompetencia: number;
    private nivel: number;

    constructor(idVaga: number, idCompetencia: number, nivel: number) {
        this.id = uuidv4();
        this.idVaga = idVaga;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }

    ObterId(): string {
        return this.id;
    }

    getNivel(): number{
        return this.nivel
    }
}
export default VagaCompetencia