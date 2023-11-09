import VagaCompetencia from "../../modelo/VagaCompetencia";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaCompetenciaService from "../../service/vaga/VagaCompetenciaService";

class VagaCompetenciaController {
    private usuarioService: UsuarioService;
    private vagaCompetenciaService: VagaCompetenciaService

    constructor(usuarioService: UsuarioService) {
        this.usuarioService = usuarioService;
        this.vagaCompetenciaService = new VagaCompetenciaService
    }

    buscarCompetenciaPorId(idCompetencia: number) {
        return this.vagaCompetenciaService.buscarCompetenciaPorId(idCompetencia);
    }

    listarCompetencias(idVaga: number) {
        return this.vagaCompetenciaService.listarCompetencias(idVaga);
    }


    adicionarCompetencia(competencia: VagaCompetencia) {

         this.vagaCompetenciaService.criarCompetencia(competencia);
    }

    atualizarCompetencia(competenciaAtualizada: VagaCompetencia) {
        this.vagaCompetenciaService.atualizarCompetencia(competenciaAtualizada.id, competenciaAtualizada);
    }

    excluirCompetencia(idCompetencia: number) {
        this.vagaCompetenciaService.excluirCandidato(idCompetencia);
    }
}
export default VagaCompetenciaController;