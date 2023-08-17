import Competencia from './competencia';
import Experiencia from './experiencia';
import Formacao from './formacao';

class Candidato {
  nome: string;
  email: string;
  cep: string;
  cpf: string;
  idade: number;
  estado: string;
  descricaoPessoal: string;
  competencias: Competencia[]; 
  formacoes: Formacao[];
  experiencias: Experiencia[]

  constructor(
    nome: string,
    email: string,
    cep: string,
    cpf: string,
    idade: number,
    estado: string,
    descricaoPessoal: string,
    competencias: Competencia[],
    formacoes: Formacao[],
    experiencias: Experiencia[]
  ) {
    this.nome = nome;
    this.email = email;
    this.cep = cep;
    this.cpf = cpf;
    this.idade = idade;
    this.estado = estado;
    this.descricaoPessoal = descricaoPessoal;
    this.competencias = competencias; 
    this.formacoes = formacoes;
    this.experiencias = experiencias;
  }

  obterCompetencias(): Competencia[] {
    return this.competencias;
  }
}

export default Candidato;
