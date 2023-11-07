import VagaDTO from "../../modelo/dto/VagaDTO";
import Vaga from "../../modelo/Vaga";
import UsuarioService from "../usuario/UsuarioService";
import Candidato from "../../modelo/Candidato";
import VagaApi from "../../api/vaga/vagaApi";

class VagaService {
    api: VagaApi
    usuarioService: UsuarioService;

    constructor() {
        this.api = new VagaApi
        this.usuarioService = new UsuarioService();
    }

    async listarVagas(): Promise<Vaga[]> {
        const response = await this.api.listarVagas();
        return response.data;
    }

    async buscarVagaDaEmpresaPorId(idEmpresa: number): Promise<Vaga> {
        const response = await this.api.buscarVagaDaEmpresaPorId(idEmpresa);
        return response.data;
    }

    async buscarVagasDaEmpresa(idEmpresa: number): Promise<Vaga[]> {
        const response = await this.api.buscarVagasDaEmpresa(idEmpresa);
        return response.data;
    }


    async adicionarVaga(vaga: Vaga): Promise<void> {
        try {
            await this.api.criarVaga(vaga);
        } catch (error) {
            console.error('Erro ao criar candidato:', error);
        }
    }

    async atualizarVaga(id: number, vaga: Vaga): Promise<boolean> {
        try {
            const response = await this.api.atualizarVaga(id, vaga)
            return true;
        } catch {
            return false;
        }
    }

    async excluirVaga(idEmpresa: number): Promise<boolean> {
        try {
            await this.api.excluirVaga(idEmpresa);
            return true;
        } catch {
            return false;
        }
    }

    calcularAfinidadeVagaComCandidato(vaga: VagaDTO): number {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado()
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);

        if (!candidatoLogado) {
            return 0;
        }

        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(vaga, candidatoLogado);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(vaga, candidatoLogado);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(vaga, candidatoLogado);

        const maxAfinidade = (3 * vaga.competencias.length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;

        return afinidadePercentual;
    }

    private calcularAfinidadeCompetencias(vaga: VagaDTO, candidato: Candidato): number {
        let afinidade = 0;

        vaga.competencias.forEach(requisito => {
            const competenciaCandidato = candidato.competencias.find(
                competencia => competencia.idNivelCompetencia === requisito.nivel);
            if (competenciaCandidato && competenciaCandidato.idNivelCompetencia === requisito.nivel) {
                afinidade += 3;
            }
        });

        return afinidade;
    }

    private calcularAfinidadeExperiencia(vaga: VagaDTO, candidato: Candidato): number {
        const experienciaCandidato = candidato.experiencias.find(
            experiencia => experiencia.nivel === vaga.experienciaMinima);
        return experienciaCandidato ? 3 : 0;
    }

    private calcularAfinidadeFormacao(vaga: VagaDTO, candidato: Candidato): number {
        const formacaoCandidato = candidato.formacoes.find(
            formacao => formacao.nivel === vaga.formacaoMinima);
        return formacaoCandidato ? 3 : 0;
    }


}
export default VagaService