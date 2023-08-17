import Competencia from './competencia';

class Candidato {
  nome: string;
  email: string;
  cep: string;
  cpf: string;
  idade: number;
  estado: string;
  descricaoPessoal: string;
  competencias: Competencia[]; 

  constructor(
    nome: string,
    email: string,
    cep: string,
    cpf: string,
    idade: number,
    estado: string,
    descricaoPessoal: string,
    competencias: Competencia[] 
  ) {
    this.nome = nome;
    this.email = email;
    this.cep = cep;
    this.cpf = cpf;
    this.idade = idade;
    this.estado = estado;
    this.descricaoPessoal = descricaoPessoal;
    this.competencias = competencias; 
  }
}

export default Candidato;
