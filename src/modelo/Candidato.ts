import CandidatoCompetencia from './CandidatoCompetencia';
import Pessoa from './Pessoa';
import Experiencia from './Experiencia';
import Formacao from './Formacao';

class Candidato extends Pessoa {
  private sobrenome: string;
  private dataNascimento: Date | null;
  private cpf: string;
  private redeSocial: string;
  private competencias: CandidatoCompetencia[];
  private formacoes: Formacao[];
  private experiencias: Experiencia[];

  constructor(
    nome: string,
    email: string,
    pais: string,
    cep: string,
    redeSocial: string,
    descricao: string,
    senha: string,
    sobrenome: string,
    dataNascimento: Date,
    cpf: string
  ) {
    super(nome, email, pais, cep, descricao, senha);
    this.sobrenome = sobrenome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.redeSocial = redeSocial
    this.competencias = [];
    this.formacoes = [];
    this.experiencias = [];
  }

  getCompetencias(): CandidatoCompetencia[] {
    return this.competencias
  }
  getExperiencias(): Experiencia[] {
    return this.experiencias
  }
  getFormacoes(): Formacao[] {
    return this.formacoes
  }
}

export default Candidato;
