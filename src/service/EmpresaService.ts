import VagaDTO from "../modelo/dto/VagaDTO";
import Vaga from "../modelo/Vaga";
import Empresa from "../modelo/Empresa";
import Candidato from "../modelo/Candidato";

import LocalStorageService from "./localStorageService";
import UsuarioService from "./usuarioService";
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
            vaga.obterId(),
            vaga.getNome(),
            vaga.getDescricao(),
            vaga.getFormacao(),
            vaga.getExperiencia(),
            vaga.getCompetencias()
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
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const indice = empresas.findIndex((empresa) => empresa.id === empresaAtualizada.id);

        if (indice !== -1) {
            empresas[indice] = empresaAtualizada;
            this.localStorageService.salvarDados(empresas);
        }
    }

    obterVagasDaEmpresa(idEmpresa: string): Vaga[] {
        const empresasJson = localStorage.getItem('empresas');

        if (empresasJson) {
            const empresas = JSON.parse(empresasJson) as Empresa[];

            const vagasEncontradas = empresas.find((empresa) => empresa.id === idEmpresa);

            if (vagasEncontradas) {
                return vagasEncontradas.vagas || [];
            }
        }

        return [];
    }

    adicionarVagaAEmpresa(idEmpresa: string, vaga: Vaga): void {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            const empresaExistente = empresas[empresaIndex];
            empresaExistente.vagas.push(vaga);
            this.localStorageService.salvarDados(empresas);
        }
    }

    atualizarVagaDaEmpresa(idEmpresa: string, NovasVagas: Vaga[]): void {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const empresaIndex = empresas.findIndex((empresa) => empresa.id === idEmpresa);

        if (empresaIndex !== -1) {
            empresas[empresaIndex].vagas = NovasVagas;
            this.localStorageService.salvarDados(empresas);
        }
    }

    excluirVagaDaEmpresa(idEmpresa: string, idVaga: string) {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
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

    adicionarCompetenciaAVaga( novaCompetencia: VagaCompetencia) {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const empresaIndex = empresas.findIndex((empresa) => empresa.vagas.some((vaga) => vaga.id === novaCompetencia.idVaga));

        if (empresaIndex !== -1) {
            const empresa = empresas[empresaIndex];
            const vagaIndex = empresa.vagas.findIndex((vaga) => vaga.id === novaCompetencia.idVaga);

            if (vagaIndex !== -1) {
                const vaga = empresa.vagas[vagaIndex];
                vaga.competencias.push(novaCompetencia);
                this.localStorageService.salvarDados(empresas);
            }
        }
    }

    atualizarCompetenciaDaVaga( idCompetencia: string, novaCompetencia: VagaCompetencia) {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const empresaIndex = empresas.findIndex((empresa) => empresa.vagas.some((vaga) => vaga.id === novaCompetencia.idVaga));

        if (empresaIndex !== -1) {
            const empresa = empresas[empresaIndex];
            const vagaIndex = empresa.vagas.findIndex((vaga) => vaga.id === novaCompetencia.idVaga);

            if (vagaIndex !== -1) {
                const vaga = empresa.vagas[vagaIndex];
                const competenciaIndex = vaga.competencias.findIndex((competencia) => competencia.id === idCompetencia);

                if (competenciaIndex !== -1) {
                    vaga.competencias[competenciaIndex] = novaCompetencia;
                    this.localStorageService.salvarDados(empresas);
                }
            }
        }
    }



    excluirCompetenciaDaVaga(idVaga: string, idCompetencia: string) {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const empresaIndex = empresas.findIndex((empresa) => empresa.vagas.some((vaga) => vaga.id === idVaga));

        if (empresaIndex !== -1) {
            const empresa = empresas[empresaIndex];
            const vagaIndex = empresa.vagas.findIndex((vaga) => vaga.id === idVaga);

            if (vagaIndex !== -1) {
                const vaga = empresa.vagas[vagaIndex];
                const competenciaIndex = vaga.competencias.findIndex((competencia) => competencia.id === idCompetencia);

                if (competenciaIndex !== -1) {
                    vaga.competencias.splice(competenciaIndex, 1);
                    this.localStorageService.salvarDados(empresas);
                }
            }
        }
    }


    obterCompetenciasDaVaga(idVaga: string): VagaCompetencia[] {
        const empresaJson = localStorage.getItem('empresas');

        if (empresaJson) {
            const empresas = JSON.parse(empresaJson) as Empresa[];
            const empresaEncontrada = empresas.find((empresa) => empresa.vagas.some((vaga) => vaga.id === idVaga));

            if (empresaEncontrada) {
                const vagaEncontrada = empresaEncontrada.vagas.find((vaga) => vaga.id === idVaga);

                if (vagaEncontrada) {
                    return vagaEncontrada.competencias || [];
                }
            }
        }
        return [];
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

        const maxAfinidade = (3 * vaga.getVagas().length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;

        return afinidadePercentual;
    }

    private calcularAfinidadeCompetencias(vaga: VagaDTO, candidato: Candidato): number {
        let afinidade = 0;

        vaga.getVagas().forEach(requisito => {
            const competenciaCandidato = candidato.getCompetencias().find(
                competencia => competencia.getNivel() === requisito.getNivel());
            if (competenciaCandidato && competenciaCandidato.getNivel() === requisito.getNivel()) {
                afinidade += 3;
            }
        });

        return afinidade;
    }

    private calcularAfinidadeExperiencia(vaga: VagaDTO, candidato: Candidato): number {
        const experienciaCandidato = candidato.getExperiencias().find(
            experiencia => experiencia.getNivel() === vaga.getExperiencia());
        return experienciaCandidato ? 3 : 0;
    }

    private calcularAfinidadeFormacao(vaga: VagaDTO, candidato: Candidato): number {
        const formacaoCandidato = candidato.getFormacoes().find(
            formacao => formacao.getNivel() === vaga.getFormacao());
        return formacaoCandidato ? 3 : 0;
    }

}

export default EmpresaService;