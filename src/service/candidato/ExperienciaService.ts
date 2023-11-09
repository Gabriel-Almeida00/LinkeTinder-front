import CandidatoExperienciaApi from "../../api/candidato/candidatoExperienciaApi";
import Experiencia from "../../modelo/Experiencia";

class ExperienciaService {
    private api: CandidatoExperienciaApi;

    constructor() {
        this.api = new CandidatoExperienciaApi();
    }

    async obterExperienciaDoCandidatoPorId(id: number ): Promise<Experiencia> {
        const response = await this.api.buscarExperienciaPorId(id);
        return await response.data
    }

    async obterExperienciasDoCandidato(candidatoId: number): Promise<Experiencia[]> {
       const response = await this.api.listarExperienciasDoCandidato(candidatoId)
       return await response.data
    }

    async adicionarExperienciaAoCandidato( experiencia: Experiencia):Promise<void> {
       try{
            await this.api.criarExperiencia(experiencia)
       } catch(error){
        console.log("erro ao criar formação: ", error)
       }
    }

    async atualizarExperienciaDoCandidato(id: number, experiencia: Experiencia): Promise<boolean> {
        try {
             await this.api.atualizarExperiencia(id, experiencia)
            return true;
        } catch {
            return false;
        }
    }

    async excluirExperienciaDoCandidato(id: number ): Promise<boolean> {
        try {
            await this.api.excluirExperiencia(id);
            return true;
        } catch {
            return false;
        }
    }
}
export default ExperienciaService;