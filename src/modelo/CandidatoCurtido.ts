class CandidatoCurtido {
    private id!: number;
    private idCandidato: number;
    private idEmpresa: number;

    constructor(idCandidato: number, idEmpresa: number) {
        this.idCandidato = idCandidato;
        this.idEmpresa = idEmpresa;
    }

    obterId(): number{
        return this.id
       }
}
export default CandidatoCurtido;
