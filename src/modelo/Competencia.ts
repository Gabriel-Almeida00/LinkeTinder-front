class Competencia {
  private id!: number;
  nome: string;

  constructor(nome: string) {
      this.nome = nome;
    }

    obterNome(): string {
      return this.nome;
  }

  obterId(): number{
    return this.id
   }

}
  
  export default Competencia;