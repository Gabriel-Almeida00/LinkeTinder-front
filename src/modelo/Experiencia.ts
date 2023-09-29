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

    obterId(): string {
        return this.id
    }

    getNivel(): number {
        return this.nivel
    }
    getCargo():string{
        return this.cargo
    }
    getEmpresa():string{
        return this.empresa
    }
}

export default Experiencia;