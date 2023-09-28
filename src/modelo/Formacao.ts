import { v4 as uuidv4 } from 'uuid';

class Formacao {
   id: string;
  private idCandidato: string;
   instituicao: string;
   curso: string;
   nivel: number;
   anoConclusao: string;

  constructor(idCandidato: string, instituicao: string, curso: string, nivel: number, anoConclusao: string) {
    this.id = uuidv4();
    this.idCandidato = idCandidato;
    this.instituicao = instituicao;
    this.curso = curso;
    this.nivel = nivel;
    this.anoConclusao = anoConclusao;
  }

  obterId(): string {
    return this.id
  }
  getNivel(): number {
    return this.nivel
  }
  getInstituicao():string{
    return this.instituicao
  }
  getCurso():string{
    return this.curso
  }
}

export default Formacao;