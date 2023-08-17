import Candidato from "../modelo/candidato";
import CandidatoInfo from "../modelo/candidatoInfo";
import localStorageService from "./localStorageService";

class CandidatoService {
    private candidatos: Candidato[] = [];
    private localStorageService: localStorageService;

    constructor() {
        this.localStorageService = new localStorageService('candidatos');
        this.carregarCandidatosDoLocalStorage();
    }

    private salvarCandidatosNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.candidatos);
    }

    private carregarCandidatosDoLocalStorage(): void {
        const candidatos = this.localStorageService.carregarDados();
        if (candidatos) {
            this.candidatos = candidatos;
        }
    }

    listarCandidatos(): Candidato[] {
        return this.candidatos;
    }

    listarCandidatosInfo(): CandidatoInfo[] {
        return this.candidatos.map(candidato => new CandidatoInfo
            (candidato.descricaoPessoal, candidato.competencias));
    }
    

    cadastrarCandidato(candidato: Candidato): void {
        this.candidatos.push(candidato);
        this.salvarCandidatosNoLocalStorage();
    }

    
}

export default CandidatoService;
