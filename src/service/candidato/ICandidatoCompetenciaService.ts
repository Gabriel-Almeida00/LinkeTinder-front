import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";

interface ICandidatoCompetenciaService {
    obterCompetenciaDoCandidatoPorId(candidatoId: number, competenciaId: string): CandidatoCompetencia | null;
    obterCompetenciasDoCandidato(idCandidato: number): CandidatoCompetencia[];
    adicionarCompetenciaAoCandidato(candidatoId: number, novaCompetencia: CandidatoCompetencia): void;
    atualizarCompetenciaDoCandidato(candidatoId: number, competenciaAtualizada: CandidatoCompetencia): void;
    excluirCompetenciaDoCandidato(candidatoId: number, competenciaId: string): void;
}

export default ICandidatoCompetenciaService;
