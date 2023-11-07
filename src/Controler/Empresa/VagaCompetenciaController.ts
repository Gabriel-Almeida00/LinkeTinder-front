import VagaCompetencia from "../../modelo/VagaCompetencia";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaCompetenciaService from "../../service/vaga/VagaCompetenciaService";

class VagaCompetenciaController {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;
    private vagaCompetenciaService: VagaCompetenciaService

    constructor(empresaService: EmpresaService, usuarioService: UsuarioService) {
        this.empresaService = empresaService;
        this.usuarioService = usuarioService;
        this.vagaCompetenciaService = new VagaCompetenciaService
    }

    buscarCompetenciaPorId(idVaga: number, idCompetencia: string) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        return this.vagaCompetenciaService.obterCompetenciaDaVagaPorId(idEmpresa, idVaga, idCompetencia);
    }

    listarCompetencias(idVaga: number) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        return this.vagaCompetenciaService.obterCompetenciasDaVaga(idEmpresa, idVaga);
    }


    adicionarCompetencia(competencia: VagaCompetencia) {
         const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
         this.vagaCompetenciaService.adicionarCompetenciaAVaga(idEmpresa, competencia.idVaga, competencia);
    }

    atualizarCompetencia(competenciaAtualizada: VagaCompetencia) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        this.vagaCompetenciaService.atualizarCompetenciaDaVaga(idEmpresa, competenciaAtualizada.idVaga, competenciaAtualizada);
    }

    excluirCompetencia(idVaga: number,idCompetencia: string) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        this.vagaCompetenciaService.excluirCompetenciaDaVaga(idEmpresa,idVaga, idCompetencia);
    }
}
export default VagaCompetenciaController;