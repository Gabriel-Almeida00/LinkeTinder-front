import LocalStorage from "../../data/LocalStorage";
import Empresa from "../../modelo/Empresa";
import VagaDTO from "../../modelo/dto/VagaDTO";
import Vaga from "../../modelo/Vaga";
import UsuarioService from "../usuario/UsuarioService";
import Candidato from "../../modelo/Candidato";

class VagaService {
    private empresas: Empresa[] = []
    private localStorageService: LocalStorage<Empresa>;
    usuarioService: UsuarioService;

    constructor() {
        this.localStorageService = new LocalStorage<Empresa>('empresas');
        this.usuarioService = new UsuarioService();
    }

    private converterVagaParaDTO(vaga: Vaga): VagaDTO {
        return new VagaDTO(
            vaga.id,
            vaga.nome,
            vaga.descricao,
            vaga.formacaoMinima,
            vaga.experienciaMinima,
            vaga.competencias
        );
    }

    listarVagasDTO(): VagaDTO[] {
        const vagas: VagaDTO[] = [];

        this.empresas.forEach(empresa => {
            empresa.vagas.forEach(vaga => {
                const vagaDTO = this.converterVagaParaDTO(vaga);
                vagas.push(vagaDTO);
            });
        });

        return vagas;
    }


    obterVagasDaEmpresa(idEmpresa: number): Vaga[] {
        const empresas = this.localStorageService.carregarDados();
        const vagasEncontradas = empresas.find((empresa) => empresa.id === idEmpresa);

        if (vagasEncontradas) {
            return vagasEncontradas.vagas || [];
        }
        return [];
    }

    adicionarVagaAEmpresa(idEmpresa: number, vaga: Vaga): void {
        const empresas = this.localStorageService.carregarDados();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            const empresaExistente = empresas[empresaIndex];
            empresaExistente.vagas.push(vaga);
            this.localStorageService.salvarDados(empresas);
        }
    }

    atualizarVagaDaEmpresa(idEmpresa: number, NovasVagas: Vaga[]): void {
        const empresas = this.localStorageService.carregarDados();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            empresas[empresaIndex].vagas = NovasVagas;
            this.localStorageService.salvarDados(empresas);
        }
    }

    excluirVagaDaEmpresa(idEmpresa: number, idVaga: number) {
        const empresas = this.localStorageService.carregarDados();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            const empresa = empresas[empresaIndex];
            const vagaIndex = empresa.vagas.findIndex((vaga) => vaga.id === idVaga);

            if (vagaIndex !== -1) {
                empresa.vagas.splice(vagaIndex, 1);
                this.localStorageService.salvarDados(empresas);
            }
        }
    }




    calcularAfinidadeVagaComCandidato(vaga: VagaDTO): number {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado()
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);

        if (!candidatoLogado) {
            return 0;
        }

        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(vaga, candidatoLogado);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(vaga, candidatoLogado);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(vaga, candidatoLogado);

        const maxAfinidade = (3 * vaga.competencias.length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;

        return afinidadePercentual;
    }

    private calcularAfinidadeCompetencias(vaga: VagaDTO, candidato: Candidato): number {
        let afinidade = 0;

        vaga.competencias.forEach(requisito => {
            const competenciaCandidato = candidato.competencias.find(
                competencia => competencia.idNivelCompetencia === requisito.nivel);
            if (competenciaCandidato && competenciaCandidato.idNivelCompetencia === requisito.nivel) {
                afinidade += 3;
            }
        });

        return afinidade;
    }

    private calcularAfinidadeExperiencia(vaga: VagaDTO, candidato: Candidato): number {
        const experienciaCandidato = candidato.experiencias.find(
            experiencia => experiencia.nivel === vaga.experienciaMinima);
        return experienciaCandidato ? 3 : 0;
    }

    private calcularAfinidadeFormacao(vaga: VagaDTO, candidato: Candidato): number {
        const formacaoCandidato = candidato.formacoes.find(
            formacao => formacao.nivel === vaga.formacaoMinima);
        return formacaoCandidato ? 3 : 0;
    }


}
export default VagaService