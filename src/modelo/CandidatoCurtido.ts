import { v4 as uuidv4 } from 'uuid';

class CandidatoCurtido {
     id: string;
     idCandidato: string;
     idEmpresa: string;

    constructor(idCandidato: string, idEmpresa: string) {
        this.id = uuidv4();
        this.idCandidato = idCandidato;
        this.idEmpresa = idEmpresa;
    }

  
}
export default CandidatoCurtido;
