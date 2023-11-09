import VagaCompetencia from '../VagaCompetencia';
import CompetenciaCandidatoDTO from './CompetenciaCandidatoDTO';
import ExperienciaVagaDTO from './ExperienciaVagaDTO';
import FormacaoVagaDTO from './FormacaoVagaDTO';

export default class VagaDTO {
     id: number;
     nome: string;
     descricao: string;
     formacao: FormacaoVagaDTO;
     experiencia: ExperienciaVagaDTO;
     competencias: CompetenciaCandidatoDTO[];

    constructor(
        id: number,
        nome: string,
        descricao: string,
        formacao: FormacaoVagaDTO,
        experiencia: ExperienciaVagaDTO,
        competencias: CompetenciaCandidatoDTO[]
    ) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.formacao = formacao;
        this.experiencia = experiencia;
        this.competencias = competencias;
    }
}
