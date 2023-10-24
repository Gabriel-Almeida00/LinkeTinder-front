import VagaDTO from "../modelo/dto/VagaDTO";
import Vaga from "../modelo/Vaga";
import Empresa from "../modelo/Empresa";
import Candidato from "../modelo/Candidato";

import LocalStorageService from "../data/LocalStorage";
import UsuarioService from "./usuario/UsuarioService";
import VagaCompetencia from "../modelo/VagaCompetencia";

class EmpresaService {
    private empresas: Empresa[] = []
    private localStorageService: LocalStorageService<Empresa>;
    usuarioService: UsuarioService;

    constructor() {
        this.localStorageService = new LocalStorageService<Empresa>('empresas');
        this.usuarioService = new UsuarioService();
        this.carregarEmpresasDoLocalStorage();

    }

    private salvarEmpresasNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.empresas);
    }

    private carregarEmpresasDoLocalStorage(): void {
        const empresas = this.localStorageService.carregarDados();
        if (empresas.length > 0) {
            this.empresas = empresas;
        }
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

    cadastrarEmpresa(empresa: Empresa): void {
        this.empresas.push(empresa);
        this.salvarEmpresasNoLocalStorage();
    }

    atualizarEmpresaNoLocalStorage(empresaAtualizada: Empresa): void {
        const empresas = this.localStorageService.carregarDados();
        const indice = empresas.findIndex((empresa) => empresa.id === empresaAtualizada.id);

        if (indice !== -1) {
            empresas[indice] = empresaAtualizada;
            this.localStorageService.salvarDados(empresas);
        }
    }

    obterVagasDaEmpresa(idEmpresa: string): Vaga[] {
        const empresas = this.localStorageService.carregarDados();
        const vagasEncontradas = empresas.find((empresa) => empresa.id === idEmpresa);

        if (vagasEncontradas) {
            return vagasEncontradas.vagas || [];
        }
        return [];
    }

    adicionarVagaAEmpresa(idEmpresa: string, vaga: Vaga): void {
        const empresas = this.localStorageService.carregarDados();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            const empresaExistente = empresas[empresaIndex];
            empresaExistente.vagas.push(vaga);
            this.localStorageService.salvarDados(empresas);
        }
    }

    atualizarVagaDaEmpresa(idEmpresa: string, NovasVagas: Vaga[]): void {
        const empresas = this.localStorageService.carregarDados();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            empresas[empresaIndex].vagas = NovasVagas;
            this.localStorageService.salvarDados(empresas);
        }
    }

    excluirVagaDaEmpresa(idEmpresa: string, idVaga: string) {
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

    adicionarCompetenciaAVaga(idEmpresa: string, idVaga: string, novaCompetencia: VagaCompetencia): void {
        const empresas = this.localStorageService.carregarDados();
        const empresa = empresas.find((e) => e.id === idEmpresa);

        if (empresa) {
            const vaga = empresa.vagas.find((e) => e.id === idVaga);
            if (vaga) {
                vaga.competencias.push(novaCompetencia);

                this.localStorageService.salvarDados(empresas);
            }
        }
    }

    atualizarCompetenciaDaVaga(idEmpresa: string, idVaga: string, competenciaAtualizada: VagaCompetencia): void {
        const empresas = this.localStorageService.carregarDados();
        const empresa = empresas.find((e) => e.id === idEmpresa);

        if (empresa) {
            const vaga = empresa.vagas.find((v) => v.id === idVaga);
            if (vaga) {
                const competencia = vaga.competencias.findIndex((c) => c.id === competenciaAtualizada.id);
                vaga.competencias[competencia] = competenciaAtualizada;
                this.localStorageService.salvarDados(empresas);
            }
        }
    }


    excluirCompetenciaDaVaga(idEmpresa: string, idVaga: string, idCompetencia: string) {
        const empresas = this.localStorageService.carregarDados();
        const empresa = empresas.find((e) => e.id === idEmpresa);

        if (empresa) {
            const vaga = empresa.vagas.find((v) => v.id === idVaga);

            if (vaga) {
                const competenciaIndex = vaga.competencias.findIndex((c) => c.id === idCompetencia);

                if (competenciaIndex !== -1) {
                    vaga.competencias.splice(competenciaIndex, 1);
                    this.localStorageService.salvarDados(empresas);
                }
            }
        }
    }

    obterCompetenciaDaVagaPorId(empresaId: string, vagaId: string, competenciaId: string): VagaCompetencia | null {
        const empresas = this.localStorageService.carregarDados();
        const empresa = empresas.find((e) => e.id === empresaId);

        if (empresa) {
            const vaga = empresa.vagas.find((v) => v.id === vagaId);

            if (vaga) {
                const competencia = vaga.competencias.find((c) => c.id === competenciaId);
                return competencia || null;
            }

            return null;
        }

        return null;
    }


    obterCompetenciasDaVaga(idEmpresa: string, idVaga: string): VagaCompetencia[] {
        const empresas = this.localStorageService.carregarDados();
        const empresa = empresas.find((e) => e.id === idEmpresa);

        if (empresa) {
            const vaga = empresa.vagas.find((v) => v.id === idVaga);
            if (vaga) {
                return vaga.competencias
            }
            return []
        }
        return []
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
                competencia => competencia.nivel === requisito.nivel);
            if (competenciaCandidato && competenciaCandidato.nivel === requisito.nivel) {
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

export default EmpresaService;