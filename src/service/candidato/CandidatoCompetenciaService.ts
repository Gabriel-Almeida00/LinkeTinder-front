import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import Candidato from "../../modelo/Candidato";
import ICandidatoCompetenciaService from "./ICandidatoCompetenciaService";
import ILocalStorage from "../../data/ILocalStorage";

class CandidatoCompetenciaService implements ICandidatoCompetenciaService {
    private localStorageService: ILocalStorage<Candidato>;

    constructor(localStorageService: ILocalStorage<Candidato>) {
        this.localStorageService = localStorageService;
    }

    obterCompetenciaDoCandidatoPorId(candidatoId: string, competenciaId: string): CandidatoCompetencia | null {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
    
        if (candidato) {
            const competencia = candidato.competencias.find((c) => c.id === competenciaId);
            return competencia || null;
        }
    
        return null;
    }
    

    obterCompetenciasDoCandidato(idCandidato: string): CandidatoCompetencia[] {
        const candidatos = this.localStorageService.carregarDados();

        const candidatoEncontrado = candidatos.find((candidato) => candidato.id === idCandidato);

        if (candidatoEncontrado) {
            return candidatoEncontrado.competencias || [];
        }

        return [];
    }

    adicionarCompetenciaAoCandidato(candidatoId: string, novaCompetencia: CandidatoCompetencia): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((candidato) => candidato.id === candidatoId);

        if (candidatoIndex !== -1) {
            const candidatoExistente = candidatos[candidatoIndex];
            candidatoExistente.competencias.push(novaCompetencia);

            this.localStorageService.salvarDados(candidatos);
        }
    }

    atualizarCompetenciaDoCandidato(candidatoId: string, competenciaAtualizada: CandidatoCompetencia): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
    
        if (candidato) {
            const competenciaIndex = candidato.competencias.findIndex((comp) => comp.id === competenciaAtualizada.id);
            if (competenciaIndex !== -1) {
               candidato.competencias[competenciaIndex] = competenciaAtualizada;
                this.localStorageService.salvarDados(candidatos);
            }
        }
    }
    

    excluirCompetenciaDoCandidato(candidatoId: string, competenciaId: string): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((candidato) => candidato.id === candidatoId);

        if (candidatoIndex !== -1) {
            const candidato = candidatos[candidatoIndex];
            const competenciaIndex = candidato.competencias
                .findIndex((competencia) => competencia.idCompetencia === competenciaId);

            if (competenciaIndex !== -1) {
                candidato.competencias.splice(competenciaIndex, 1);
                this.localStorageService.salvarDados(candidatos);
            }
        }
    }
}
export default CandidatoCompetenciaService;