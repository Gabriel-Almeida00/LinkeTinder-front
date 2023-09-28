import CandidatoCompetencia from './CandidatoCompetencia';
import Pessoa from './Pessoa';
import Experiencia from './Experiencia';
import Formacao from './Formacao';
import TipoUsuario from './enum/tipoUsuario';

class Candidato extends Pessoa {
   sobrenome: string;
   dataNascimento: Date;
   cpf: string;
   redeSocial: string;
   telefone: string;
   competencias: CandidatoCompetencia[];
   formacoes: Formacao[];
  private experiencias: Experiencia[];

  constructor(
    nome: string,
    email: string,
    pais: string,
    cep: string,
    redeSocial: string,
    telefone: string,
    descricao: string,
    senha: string,
    sobrenome: string,
    dataNascimento: Date,
    cpf: string,
    tipoUsuario: TipoUsuario.Candidato
  ) {
    super(nome, email, pais, cep, descricao, senha, tipoUsuario);
    this.sobrenome = sobrenome;
    this.dataNascimento = dataNascimento;
    this.cpf = cpf;
    this.redeSocial = redeSocial;
    this.telefone = telefone;
    this.competencias = []
    this.formacoes = []
    this.experiencias = []
  }

  getRedeSocial(): string {
    return this.redeSocial
  }

  getTelefone(): string {
    return this.telefone
  }

  getSobrenome(): string {
    return this.sobrenome
  }

  getDataNascimento(): Date{
    return this.dataNascimento
  }

  getCpf(): string{
    return this.cpf
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
