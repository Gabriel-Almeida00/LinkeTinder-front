import VagaCompetenciaApi from "../../api/vaga/vagaCompetenciaApi";
import VagaCompetencia from "../../modelo/VagaCompetencia";
import CompetenciaDTO from "../../modelo/dto/CandidatoCompetenciaDTO";

class VagaCompetenciaService{
    private api: VagaCompetenciaApi;

    constructor() {
        this.api = new VagaCompetenciaApi();
    }


    async listarCompetencias(id: number): Promise<CompetenciaDTO[]> {
        const response = await this.api.listarCompetencias(id);
        return response.data;
    }

    async buscarCompetenciaPorId(id: number): Promise<VagaCompetencia> {
        const response = await this.api.buscarCompetenciaPorId(id);
        return response.data;
    }


    async criarCompetencia(competencia: VagaCompetencia): Promise<void> {
        try {
            await this.api.criarCompetencia(competencia);
        } catch (error) {
            console.error('Erro ao criar candidato:', error);
        }
    }

    async atualizarCompetencia(id: number, competencia: VagaCompetencia): Promise<boolean> {
        try {
            const response = await this.api.atualizarCompetencia(id, competencia)
            return true;
        } catch {
            return false;
        }
    }

    async excluirCandidato(id: number): Promise<boolean> {
        try {
            await this.api.excluirCompetencia(id);
            return true;
        } catch {
            return false;
        }
    }
}
export default VagaCompetenciaService;