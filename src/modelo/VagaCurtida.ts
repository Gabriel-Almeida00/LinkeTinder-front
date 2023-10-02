import { v4 as uuidv4 } from 'uuid';

class VagaCurtida{
     id: string;
     idCandidata: string;
     idVaga: string;

    constructor(idCandidata: string, idVaga: string) {
        this.id = uuidv4();
        this.idCandidata = idCandidata;
        this.idVaga = idVaga;
    }
}
export default VagaCurtida;