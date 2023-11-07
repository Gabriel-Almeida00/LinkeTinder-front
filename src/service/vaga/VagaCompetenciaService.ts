import LocalStorage from "../../data/LocalStorage";
import Empresa from "../../modelo/Empresa";
import VagaCompetencia from "../../modelo/VagaCompetencia";
import UsuarioService from "../usuario/UsuarioService";

class VagaCompetenciaService{
    private empresas: Empresa[] = []
    private localStorageService: LocalStorage<Empresa>;
    usuarioService: UsuarioService;

    constructor() {
        this.localStorageService = new LocalStorage<Empresa>('empresas');
        this.usuarioService = new UsuarioService();
    }

    adicionarCompetenciaAVaga(idEmpresa: number, idVaga: number, novaCompetencia: VagaCompetencia): void {
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

    atualizarCompetenciaDaVaga(idEmpresa: number, idVaga: number, competenciaAtualizada: VagaCompetencia): void {
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


    excluirCompetenciaDaVaga(idEmpresa: number, idVaga: number, idCompetencia: string) {
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

    obterCompetenciaDaVagaPorId(empresaId: number, vagaId: number, competenciaId: string): VagaCompetencia | null {
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


    obterCompetenciasDaVaga(idEmpresa: number, idVaga: number): VagaCompetencia[] {
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
}
export default VagaCompetenciaService;