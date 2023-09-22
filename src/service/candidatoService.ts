import Candidato from "../modelo/candidato";
import CandidatoDTO from "../modelo/dto/candidatoDTO";
import Vaga from "../modelo/vaga";
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

    listarCandidatosDTO(): CandidatoDTO[] {
        return this.candidatos.map(candidato => new CandidatoDTO(
            candidato.descricaoPessoal,
            candidato.competencias,
            candidato.formacoes, 
            candidato.experiencias 
        ));
    }

  
    cadastrarCandidato(candidato: Candidato): void {
        this.candidatos.push(candidato);
        this.salvarCandidatosNoLocalStorage();
    }

    calcularAfinidadeCandidatoComVaga(candidato: CandidatoDTO, vagas: Vaga[]): number {
        let totalAfinidade = 0;

        vagas.forEach(vaga => {
            let afinidade = 0;
    
            vaga.requisitos.forEach(requisito => {
                const competenciaCandidato = candidato.competencias.find(competencia => competencia.nome === requisito.nome);
                if (competenciaCandidato && competenciaCandidato.nivel === requisito.nivel) {
                    afinidade += 3; 
                }
            });
    
            const experienciaCandidato = candidato.experiencias.find(experiencia => experiencia.nivel === vaga.experienciaMinima);
            if (experienciaCandidato) {
                afinidade += 3;
            }
    
            const formacaoCandidato = candidato.formacoes.find(formacao => formacao.nivel === vaga.formacaoMinima);
            if (formacaoCandidato) {
                afinidade += 3;
            }
    
            const maxAfinidade = (3 * vaga.requisitos.length) + 3 + 3; 
            const afinidadePercentual = (afinidade / maxAfinidade) * 100;
    
            totalAfinidade += afinidadePercentual;
        });
    
        return totalAfinidade / vagas.length;
    }

    
}

export default CandidatoService;
