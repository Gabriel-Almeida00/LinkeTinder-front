import Candidato from "../modelo/Candidato";
import Experiencia from "../modelo/Experiencia";
import LocalStorageService from "../data/LocalStorage";

class ExperienciaService {
    private localStorageService: LocalStorageService<Candidato>;

    constructor() {
        this.localStorageService = new LocalStorageService<Candidato>('candidatos');
    }

    obterExperienciaDoCanddatoPorId(candidatoId: number, experienciaId: string): Experiencia | null{
         const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
    
        if (candidato) {
            const experiencia = candidato.experiencias.find((c) => c.id === experienciaId);
            return experiencia || null;
        }
    
        return null;
    }

    obterExperienciasDoCandidato(candidatoId: number): Experiencia[] {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
        return candidato?.experiencias || [];
    }

    adicionarExperienciaAoCandidato(candidatoId: number, novaExperiencia: Experiencia): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            candidatos[candidatoIndex].experiencias.push(novaExperiencia);
            this.localStorageService.salvarDados(candidatos);
        }
    }

    atualizarExperienciasDoCandidato(candidatoId: number, experienciaAtualizada: Experiencia): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);

        if (candidato) {
            const experienciaIndex = candidato.experiencias.findIndex((exp) => exp.id === experienciaAtualizada.id);
            if (experienciaIndex !== -1) {
                candidato.experiencias[experienciaIndex] = experienciaAtualizada;
                this.localStorageService.salvarDados(candidatos)
            }
        }
    }

    excluirExperienciaDoCandidato(candidatoId: number, experienciaId: string): void {
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