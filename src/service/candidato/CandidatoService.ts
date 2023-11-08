import Candidato from "../../modelo/Candidato";
import Vaga from "../../modelo/Vaga";
import VagaCompetencia from "../../modelo/VagaCompetencia";


import ICandidatoService from "./ICandidatoService";
import CandidatoApi from "../../api/candidato/candidatoApi";
import CandidatoDTO from "../../modelo/CandidatoDTO";

class CandidatoService implements ICandidatoService {
    private api: CandidatoApi;

    constructor() {
        this.api = new CandidatoApi();
    }


    async listarCandidatos(): Promise<CandidatoDTO[]> {
        const response = await this.api.listarCandidatos();
        return response.data;
    }

    async obterCandidatoPorId(idCandidato: number): Promise<Candidato> {
        const response = await this.api.buscarCandidatoPorId(idCandidato);
        return response.data;
    }


    async adicionarCandidato(candidato: Candidato): Promise<void> {
        try {
            await this.api.criarCandidato(candidato);
        } catch (error) {
            console.error('Erro ao criar candidato:', error);
        }
    }

    async atualizarCandidato(id: number, candidato: Candidato): Promise<boolean> {
        try {
            const response = await this.api.atualizarCandidato(id, candidato)
            return true;
        } catch {
            return false;
        }
    }

    async excluirCandidato(idCandidato: number): Promise<boolean> {
        try {
            await this.api.excluirCandidato(idCandidato);
            return true;
        } catch {
            return false;
        }
    }

    calcularAfinidadeCompetencias(candidato: CandidatoDTO, requisitos: VagaCompetencia[]): number {
        let afinidade = 0;
        for (const requisito of requisitos) {
            const competenciaCandidato = candidato.competencias
                .find((competencia) => competencia.nivel === requisito.nivel
                );

            if (competenciaCandidato) {
                afinidade += 3;
            }
        }
        return afinidade;
    }

    calcularAfinidadeExperiencia(candidato: CandidatoDTO, nivelExperiencia: number): number {
        const experienciaCandidato = candidato.experiencias.find(
            (experiencia) => experiencia.nivel === nivelExperiencia
        );
        return experienciaCandidato ? 3 : 0;
    }


    calcularAfinidadeFormacao(candidato: CandidatoDTO, nivelFormacao: number): number {
        const formacaoCandidato = candidato.formacoes.find(
            (formacao) => formacao.nivel === nivelFormacao
        );
        return formacaoCandidato ? 3 : 0;
    }

    calcularAfinidadeVaga(candidato: CandidatoDTO, vaga: Vaga): number {
        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(candidato, vaga.competencias);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(candidato, vaga.experienciaMinima);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(candidato, vaga.formacaoMinima);

        const maxAfinidade = (3 * vaga.competencias.length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;

        return afinidadePercentual;
    }

    calcularAfinidadeCandidatoComVaga(candidato: CandidatoDTO, vagas: Vaga[]): number {
        if (vagas.length === 0) {
            return 0;
        }

        const totalAfinidade = vagas.reduce((acumulador, vaga) => {
            const afinidadeVaga = this.calcularAfinidadeVaga(candidato, vaga);
            return acumulador + afinidadeVaga;
        }, 0);

        return totalAfinidade / vagas.length;
    }
}
export default CandidatoService;