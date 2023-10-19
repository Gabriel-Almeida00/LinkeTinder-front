import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";

interface ICandidatoCompetenciaService {
    obterCompetenciaDoCandidatoPorId(candidatoId: string, competenciaId: string): CandidatoCompetencia | null;
    obterCompetenciasDoCandidato(idCandidato: string): CandidatoCompetencia[];
    adicionarCompetenciaAoCandidato(candidatoId: string, novaCompetencia: CandidatoCompetencia): void;
    atualizarCompetenciaDoCandidato(candidatoId: string, competenciaAtualizada: CandidatoCompetencia): void;
    excluirCompetenciaDoCandidato(candidatoId: string, competenciaId: string): void;
}

export default ICandidatoCompetenciaService;
