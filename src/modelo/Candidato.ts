import CandidatoCompetencia from './CandidatoCompetencia';
import Pessoa from './Pessoa';
import Experiencia from './Experiencia';
import Formacao from './Formacao';

class Candidato extends Pessoa {
  private sobrenome: string;
  private dataNascimento: Date | null;
  private cpf: string;
  private competencias: CandidatoCompetencia[];
  private formacoes: Formacao[];
  private experiencias: Experiencia[];

  constructor(
      nome: string,
      email: string,
      pais: string,
      cep: string,
      descricao: string,
      senha: string,
      sobrenome: string,
      dataNascimento: Date | null,
      cpf: string
  ) {
      super(nome, email, pais, cep, descricao, senha);
      this.sobrenome = sobrenome;
      this.dataNascimento = dataNascimento;
      this.cpf = cpf;
      this.competencias = [];
      this.formacoes = [];
      this.experiencias = [];
  }
}

export default Candidato;
