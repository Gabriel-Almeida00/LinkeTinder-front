import { v4 as uuidv4 } from 'uuid';


class Experiencia {
     id: string;
     idCandidato: string;
     cargo: string;
     empresa: string;
     nivel: number;

    constructor(idCandidato: string, cargo: string, empresa: string, nivel: number) {
        this.id = uuidv4();
        this.idCandidato = idCandidato;
        this.cargo = cargo;
        this.empresa = empresa;
        this.nivel = nivel;
    }
}

export default Experiencia;