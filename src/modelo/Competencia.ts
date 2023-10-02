import { v4 as uuidv4 } from 'uuid';

class Competencia {
   id: string;
  nome: string;

  constructor(nome: string) {
    this.id = uuidv4();
      this.nome = nome;
    }
}
  
  export default Competencia;