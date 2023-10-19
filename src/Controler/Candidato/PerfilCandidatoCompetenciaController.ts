import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import CandidatoService from "../../service/CandidatoService";
import CompetenciaService from "../../service/CompetenciaService";
import UsuarioService from "../../service/UsuarioService";

class PerfilCandidatoCompetenciaController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;
 
    constructor( candidatoService: CandidatoService, usuarioService: UsuarioService,) {
        this.candidatoService = candidatoService;
        this.usuarioService = usuarioService;
    }

    listarCompetencia(){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoService.obterCompetenciasDoCandidato(idCandidato);
    }

    adicionarCompetencias(novaCompetencia: CandidatoCompetencia){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const usuarioLogado = this.usuarioService.obterCandidato(idCandidato);
        usuarioLogado.competencias.push(novaCompetencia);
        this.candidatoService.adicionarCompetenciaAoCandidato(idCandidato, novaCompetencia);
    }

    atualizarCompetencia(competenciaAtualizada: CandidatoCompetencia): void {
    const idCandidato = this.usuarioService.obterIdUsuarioLogado();
    this.candidatoService.atualizarCompetenciaDoCandidato(idCandidato, competenciaAtualizada);
}


    excluirCompetencia(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.candidatoService.excluirCompetenciaDoCandidato(idCandidato, idCompetencia);
    }
}
export default PerfilCandidatoCompetenciaController