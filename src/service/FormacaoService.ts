import Candidato from "../modelo/Candidato";
import Formacao from "../modelo/Formacao";
import LocalStorageService from "../data/LocalStorage";

class FormacaoService{
    private localStorageService: LocalStorageService<Candidato>;

    constructor() {
        this.localStorageService = new LocalStorageService<Candidato>('candidatos');
    }

    obterFormacaoDoCandidatoPorId(candidatoId: string, formacaoId: string){
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
    
        if (candidato) {
            const formacao = candidato.formacoes.find((c) => c.id === formacaoId);
            return formacao || null;
        }
    
        return null;
    }

    obterFormacoesDoCandidato(candidatoId: string): Formacao[] {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);
        return candidato?.formacoes || [];
    }

    adicionarFormacaoAoCandidato(candidatoId: string, novaFormacao: Formacao): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            candidatos[candidatoIndex].formacoes.push(novaFormacao);
            this.localStorageService.salvarDados(candidatos);
        }
    }

    atualizarFormacoesDoCandidato(candidatoId: string, formacaoAtualizada: Formacao): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidato = candidatos.find((c) => c.id === candidatoId);

         if (candidato) {
            const formacaoIndex = candidato.formacoes.findIndex((comp) => comp.id === formacaoAtualizada.id);
            if (formacaoIndex !== -1) {
               candidato.formacoes[formacaoIndex] = formacaoAtualizada;
                this.localStorageService.salvarDados(candidatos);
            }
        }
    }

    excluirFormacaoDoCandidato(candidatoId: string, formacaoId: string): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            const candidato = candidatos[candidatoIndex];
            const formacaoIndex = candidato.formacoes.findIndex((f) => f.id === formacaoId);

            if (formacaoIndex !== -1) {
                candidato.formacoes.splice(formacaoIndex, 1);
                this.localStorageService.salvarDados(candidatos);
            }
        }
    }
}
export default FormacaoService