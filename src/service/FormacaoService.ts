import Candidato from "../modelo/Candidato";
import Formacao from "../modelo/Formacao";
import LocalStorageService from "../data/LocalStorage";

class FormacaoService{
    private localStorageService: LocalStorageService<Candidato>;

    constructor() {
        this.localStorageService = new LocalStorageService<Candidato>('candidatos');
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

    atualizarFormacoesDoCandidato(candidatoId: string, novasFormacoes: Formacao[]): void {
        const candidatos = this.localStorageService.carregarDados();
        const candidatoIndex = candidatos.findIndex((c) => c.id === candidatoId);

        if (candidatoIndex !== -1) {
            candidatos[candidatoIndex].formacoes = novasFormacoes;
            this.localStorageService.salvarDados(candidatos);
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