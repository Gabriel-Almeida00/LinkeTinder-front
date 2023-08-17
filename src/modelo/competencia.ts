import NivelCompetencia from "./enum/nivelCompetencia";

class Competencia {
  nome: string;
  nivel: NivelCompetencia;

  constructor(nome: string, nivel: NivelCompetencia) {
      this.nome = nome;
      this.nivel = nivel;
    }

    obterNome(): string {
      return this.nome;
  }
  
  }
  
  export default Competencia;