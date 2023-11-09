import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import CandidatoCompetenciaDTO from "../../modelo/dto/CandidatoCompetenciaDTO";

interface ICandidatoCompetenciaService {
    listarCompetenciasDoCandidato(id: number): Promise<CandidatoCompetenciaDTO[]>
    buscarCompetenciaDoCandidatoPorId(id: number): Promise<CandidatoCompetencia>
    adicionarCompetencia(competencia: CandidatoCompetencia): Promise<void> 
    atualizarCompetencia(id: number, competencia: CandidatoCompetencia): Promise<boolean> 
    excluirCompetencia(id: number): Promise<boolean> 
}

export default ICandidatoCompetenciaService;
