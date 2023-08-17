import NivelFormacao from "./enum/nivelFormacao";

class Formacao {
    instituicao: string;
    curso: string;
    nivel: NivelFormacao;
    anoConclusao: number;
  
    constructor(instituicao: string, curso: string, nivel: NivelFormacao, anoConclusao: number) {
      this.instituicao = instituicao;
      this.curso = curso;
      this.nivel = nivel;
      this.anoConclusao = anoConclusao;
    }
  }
  
  export default Formacao;