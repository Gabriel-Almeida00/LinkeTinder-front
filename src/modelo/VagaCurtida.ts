class VagaCurtida{
    private id!: number;
    private idCandidata: number;
    private idVaga: number;

    constructor(idCandidata: number, idVaga: number) {
        this.idCandidata = idCandidata;
        this.idVaga = idVaga;
    }

   obterId(): number{
    return this.id
   }
}
export default VagaCurtida;