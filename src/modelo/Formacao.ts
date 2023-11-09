
class Formacao {
   id!: number;
   idCandidato: number;
   instituicao: string;
   curso: string;
   nivel: number;
   anoConclusao: string;

  constructor(idCandidato: number, instituicao: string, curso: string, nivel: number, anoConclusao: string) {
    this.idCandidato = idCandidato;
    this.instituicao = instituicao;
    this.curso = curso;
    this.nivel = nivel;
    this.anoConclusao = anoConclusao;
  }
}

export default Formacao;