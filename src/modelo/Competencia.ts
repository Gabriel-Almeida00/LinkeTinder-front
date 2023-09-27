import { v4 as uuidv4 } from 'uuid';

class Competencia {
  private id: string;
  nome: string;

  constructor(nome: string) {
    this.id = uuidv4();
      this.nome = nome;
    }

    obterNome(): string {
      return this.nome;
  }

  obterId(): string{
    return this.id
   }

}
  
  export default Competencia;