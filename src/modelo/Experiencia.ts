class Experiencia {
     id!: number;
     idCandidato: number;
     cargo: string;
     empresa: string;
     nivel: number;

    constructor(idCandidato: number, cargo: string, empresa: string, nivel: number) {
        this.idCandidato = idCandidato;
        this.cargo = cargo;
        this.empresa = empresa;
        this.nivel = nivel;
    }
}

export default Experiencia;