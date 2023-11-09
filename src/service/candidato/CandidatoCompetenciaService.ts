import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import ICandidatoCompetenciaService from "./ICandidatoCompetenciaService";
import CandidatoCompetenciaApi from "../../api/candidato/candidatoCompetenciaApi";
import CandidatoCompetenciaDTO from "../../modelo/dto/CandidatoCompetenciaDTO";

class CandidatoCompetenciaService implements ICandidatoCompetenciaService {
    private api: CandidatoCompetenciaApi;

    constructor() {
        this.api = new CandidatoCompetenciaApi();
    }

    async listarCompetenciasDoCandidato(id: number): Promise<CandidatoCompetenciaDTO[]> {
        const response = await this.api.listarCompetenciasDoCandidato(id)
        return await response.data
    }

    async buscarCompetenciaDoCandidatoPorId(id: number): Promise<CandidatoCompetencia> {
        const response = await this.api.buscarCompetenciaDoCandidatoPorId(id);
        return response.data
    }


    async adicionarCompetencia(competencia: CandidatoCompetencia): Promise<void> {
        try {
            await this.api.criarCompetencia(competencia);
        } catch (error) {
            console.error('Erro ao criar candidato:', error);
        }
    }

    async atualizarCompetencia(id: number, competencia: CandidatoCompetencia): Promise<boolean> {
        try {
            const response = await this.api.atualizarCompetencia(id, competencia)
            return true;
        } catch {
            return false;
        }
    }

    async excluirCompetencia(id: number): Promise<boolean> {
        try {
            await this.api.excluirCompetencia(id);
            return true;
        } catch {
            return false;
        }
    }
}
export default CandidatoCompetenciaService;