import VagaCompetencia from "../../modelo/VagaCompetencia";
import EmpresaService from "../../service/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";

class VagaCompetenciaController {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;

    constructor(empresaService: EmpresaService, usuarioService: UsuarioService) {
        this.empresaService = empresaService;
        this.usuarioService = usuarioService;

    }

    buscarCompetenciaPorId(idVaga: string, idCompetencia: string) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        return this.empresaService.obterCompetenciaDaVagaPorId(idEmpresa, idVaga, idCompetencia);
    }

    listarCompetencias(idVaga: string) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        return this.empresaService.obterCompetenciasDaVaga(idEmpresa, idVaga);
    }


    adicionarCompetencia(competencia: VagaCompetencia) {
         const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
         this.empresaService.adicionarCompetenciaAVaga(idEmpresa, competencia.idVaga, competencia);
    }

    atualizarCompetencia(competenciaAtualizada: VagaCompetencia) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        this.empresaService.atualizarCompetenciaDaVaga(idEmpresa, competenciaAtualizada.idVaga, competenciaAtualizada);
    }

    excluirCompetencia(idVaga: string,idCompetencia: string) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        this.empresaService.excluirCompetenciaDaVaga(idEmpresa,idVaga, idCompetencia);
    }
}
export default VagaCompetenciaController;