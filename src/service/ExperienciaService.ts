import Candidato from "../modelo/Candidato";
import Experiencia from "../modelo/Experiencia";
import LocalStorageService from "../data/LocalStorage";

class ExperienciaService{
    private localStorageService: LocalStorageService<Candidato>;

    constructor() {
        this.localStorageService = new LocalStorageService<Candidato>('candidatos');
    }

    obterExperienciasDoCandidato(candidatoId: string): Experiencia[] {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
        return candidato?.experiencias || [];
    }

    adicionarExperienciaAoCandidato(candidatoId: string, novaExperiencia: Experiencia): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            candidatos[candidatoIndex].experiencias.push(novaExperiencia);
            this.localStorageService.salvarDados(candidatos);
        }
    }

    atualizarExperienciasDoCandidato(candidatoId: string, novasExperiencias: Experiencia[]): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            candidatos[candidatoIndex].experiencias = novasExperiencias;
            this.localStorageService.salvarDados(candidatos);
        }
    }

    excluirExperienciaDoCandidato(candidatoId: string, experienciaId: string): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            const candidato = candidatos[candidatoIndex];
            const experienciaIndex = candidato.experiencias.findIndex((e) => e.id === experienciaId);

            if (experienciaIndex !== -1) {
                candidato.experiencias.splice(experienciaIndex, 1);
                this.localStorageService.salvarDados(candidatos);
            }
        }
    }
}
export default ExperienciaService;