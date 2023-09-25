
class Formacao {
  private id!: number;
  private idCandidato: number;
  private instituicao: string;
  private curso: string;
  private nivel: number;
  private anoConclusao: string;

  constructor(idCandidato: number, instituicao: string, curso: string, nivel: number, anoConclusao: string) {
    this.idCandidato = idCandidato;
    this.instituicao = instituicao;
    this.curso = curso;
    this.nivel = nivel;
    this.anoConclusao = anoConclusao;
  }

  obterId(): number {
    return this.id
  }
}

export default Formacao;