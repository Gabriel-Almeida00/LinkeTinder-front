
class Experiencia {
    private id!: number;
    private idCandidato: number;
    private cargo: string;
    private empresa: string;
    private nivel: number;

    constructor(idCandidato: number, cargo: string, empresa: string, nivel: number) {
        this.idCandidato = idCandidato;
        this.cargo = cargo;
        this.empresa = empresa;
        this.nivel = nivel;
    }

    obterId(): number{
        return this.id
       }
}

export default Experiencia;