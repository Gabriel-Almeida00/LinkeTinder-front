import Candidato from "../../modelo/Candidato";
import CandidatoService from "../../service/candidato/CandidatoService";
import UsuarioService from "../../service/usuario/UsuarioService";

class CandidatoController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;

    constructor(candidatoService: CandidatoService, usuarioService: UsuarioService) {
        this.candidatoService = candidatoService
        this.usuarioService = usuarioService
    }

    pegarInformacoesDoCandidato() {
        const idCanddato = this.usuarioService.obterIdUsuarioLogado()
        return this.candidatoService.obterCandidatoPorId(idCanddato)
    }

    atualizarInformacoesCandidato(candidato: Candidato) {
      return this.candidatoService.atualizarCandidato(candidato.id, candidato);
    }
}
export default CandidatoController
