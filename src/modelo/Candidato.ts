import CandidatoCompetencia from './CandidatoCompetencia';
import Pessoa from './Pessoa';
import Experiencia from './Experiencia';
import Formacao from './Formacao';
import TipoUsuario from './enum/TipoUsuario';

class Candidato extends Pessoa {
  sobrenome: string;
  dataNascimento: Date;
  cpf: string;
  redeSocial: string;
  telefone: string;
  competencias: CandidatoCompetencia[];
  formacoes: Formacao[];
  experiencias: Experiencia[];

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
  setId(id: string): void {
    this.id = id
  }
}

export default Candidato;
