class VagaCompetencia{
    private id!: number;
    private idVaga: number;
    private idCompetencia: number;
    private nivel: number;

    constructor(idVaga: number, idCompetencia: number, nivel: number) {
        this.idVaga = idVaga;
        this.idCompetencia = idCompetencia;
        this.nivel = nivel;
    }

    ObterId(): number {
        return this.id;
    }

    getNivel(): number{
        return this.nivel
    }
}
export default VagaCompetencia