import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import UsuarioService from "../../service/usuario/UsuarioService";
import ICandidatoCompetenciaService from "../../service/candidato/ICandidatoCompetenciaService";

class PerfilCandidatoCompetenciaController {
    private candidatoCompetenciaService: ICandidatoCompetenciaService;
    private usuarioService: UsuarioService;
 
    constructor( candidatoCompetenciaService: ICandidatoCompetenciaService, usuarioService: UsuarioService,) {
        this.candidatoCompetenciaService = candidatoCompetenciaService;
        this.usuarioService = usuarioService;
    }

    buscarCompetenciaPorId(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoCompetenciaService.obterCompetenciaDoCandidatoPorId(idCandidato, idCompetencia);
    }

    listarCompetencia(){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoCompetenciaService.obterCompetenciasDoCandidato(idCandidato);
    }

    adicionarCompetencias(nome: string, nivel:number){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const competencia = new CandidatoCompetencia(idCandidato, nome, nivel);

        this.candidatoCompetenciaService.adicionarCompetenciaAoCandidato(idCandidato, competencia);
    }

    atualizarCompetencia(competenciaAtualizada: CandidatoCompetencia): void {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.candidatoCompetenciaService.atualizarCompetenciaDoCandidato(idCandidato, competenciaAtualizada);
}


    excluirCompetencia(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.candidatoCompetenciaService.excluirCompetenciaDoCandidato(idCandidato, idCompetencia);
    }
}
export default PerfilCandidatoCompetenciaController