import Candidato from "../modelo/Candidato";
import Vaga from "../modelo/Vaga";
import VagaCompetencia from "../modelo/VagaCompetencia";


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
            candidato.obterId(),
            candidato.getNome(),
            candidato.getDescricao(),
            candidato.getCompetencias(),
            candidato.getExperiencias(),
            candidato.getFormacoes()
        ));
    }


    cadastrarCandidato(candidato: Candidato): void {
        this.candidatos.push(candidato);
        this.salvarCandidatosNoLocalStorage();
    }

    atualizarCandidatoNoLocalStorage(candidatoAtualizado: Candidato): void {
        const candidatos = this.localStorageService.BuscarCandidatoNoLocalStorage();
        const indice = candidatos.findIndex((candidato) => candidato.id === candidatoAtualizado.id);
    
        if (indice !== -1) {
            candidatos[indice] = candidatoAtualizado;
            this.localStorageService.salvarDados(candidatos);
        }
    }
    


    calcularAfinidadeCompetencias(candidato: CandidatoDTO, requisitos: VagaCompetencia[]): number {
        let afinidade = 0;
        for (const requisito of requisitos) {
            const competenciaCandidato = candidato.getCompetencias()
                .find((competencia) => competencia.getNivel() === requisito.getNivel()
                );

            if (competenciaCandidato) {
                afinidade += 3;
            }
        }
        return afinidade;
    }

    calcularAfinidadeExperiencia(candidato: CandidatoDTO, nivelExperiencia: number): number {
        const experienciaCandidato = candidato.getExperiencias().find(
            (experiencia) => experiencia.getNivel() === nivelExperiencia
        );
        return experienciaCandidato ? 3 : 0;
    }


    calcularAfinidadeFormacao(candidato: CandidatoDTO, nivelFormacao: number): number {
        const formacaoCandidato = candidato.getFormacoes().find(
            (formacao) => formacao.getNivel() === nivelFormacao
        );
        return formacaoCandidato ? 3 : 0;
    }

    calcularAfinidadeVaga(candidato: CandidatoDTO, vaga: Vaga): number {
        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(candidato, vaga.getCompetencias());
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(candidato, vaga.getExperiencia());
        const afinidadeFormacao = this.calcularAfinidadeFormacao(candidato, vaga.getFormacao());

        const maxAfinidade = (3 * vaga.getCompetencias().length) + 3 + 3;
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