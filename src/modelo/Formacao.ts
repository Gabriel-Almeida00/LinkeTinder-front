import { v4 as uuidv4 } from 'uuid';

class Formacao {
   id: string;
   idCandidato: number;
   instituicao: string;
   curso: string;
   nivel: number;
   anoConclusao: string;

  constructor(idCandidato: number, instituicao: string, curso: string, nivel: number, anoConclusao: string) {
    this.id = uuidv4();
    this.idCandidato = idCandidato;
    this.instituicao = instituicao;
    this.curso = curso;
    this.nivel = nivel;
    this.anoConclusao = anoConclusao;
  }
}

export default Formacao;