class VagaCompetencia{
     id!: number;
     idVaga: number;
     idCompetencia: number;
     nivel: number;

    constructor(idVaga: number, idCompetencia: number, nivel: number) {
        this.idVaga = idVaga;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }
}
export default VagaCompetencia