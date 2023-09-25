import Candidato from "../modelo/Candidato";
import Competencia from "../modelo/Competencia";
import Vaga from "../modelo/Vaga";

import NivelExperiencia from "../modelo/enum/nivelExperiencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";

import CandidatoDTO from "../modelo/dto/CandidatoDTO";
import localStorageService from "./localStorageService";

class CandidatoService {
    private candidatos: Candidato[] = [];
    private localStorageService: localStorageService<Candidato>;

    constructor() {
        this.localStorageService = new localStorageService<Candidato>('candidatos');
        this.carregarCandidatosDoLocalStorage();
    }

    private salvarCandidatosNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.candidatos);
    }

    private carregarCandidatosDoLocalStorage(): void {
        const candidatos = this.localStorageService.carregarDados();
        if (candidatos.length > 0) {
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


     calcularAfinidadeCompetencias(candidato: CandidatoDTO, requisitos: Competencia[]): number {
        let afinidade = 0;
        requisitos.forEach(requisito => {
            const competenciaCandidato = candidato.competencias.find(competencia => competencia.nome === requisito.nome);
            if (competenciaCandidato && competenciaCandidato.nivel === requisito.nivel) {
                afinidade += 3;
            }
        });
        return afinidade;
    }
    
     calcularAfinidadeExperiencia(candidato: CandidatoDTO, nivelExperiencia: NivelExperiencia): number {
        const experienciaCandidato = candidato.experiencias.find(experiencia => experiencia.nivel === nivelExperiencia);
        return experienciaCandidato ? 3 : 0;
    }
    
     calcularAfinidadeFormacao(candidato: CandidatoDTO, nivelFormacao: NivelFormacao): number {
        const formacaoCandidato = candidato.formacoes.find(formacao => formacao.nivel === nivelFormacao);
        return formacaoCandidato ? 3 : 0;
    }
    
     calcularAfinidadeVaga(candidato: CandidatoDTO, vaga: Vaga): number {
        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(candidato, vaga.requisitos);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(candidato, vaga.experienciaMinima);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(candidato, vaga.formacaoMinima);
    
        const maxAfinidade = (3 * vaga.requisitos.length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;
    
        return afinidadePercentual;
    }
    
     calcularAfinidadeCandidatoComVaga(candidato: CandidatoDTO, vagas: Vaga[]): number {
        if (vagas.length === 0) {
            return 0;
        }
    
        const totalAfinidade = vagas.reduce((acumulador, vaga) => {
            const afinidadeVaga = this.calcularAfinidadeVaga(candidato, vaga);
            return acumulador + afinidadeVaga;
        }, 0);
    
        return totalAfinidade / vagas.length;
    }
    
}

export default CandidatoService;