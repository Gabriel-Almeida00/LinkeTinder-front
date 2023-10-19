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

    buscarCompetenciaPorId(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoService.obterCompetenciaDoCandidatoPorId(idCandidato, idCompetencia);
    }

    listarCompetencia(){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoService.obterCompetenciasDoCandidato(idCandidato);
    }

    adicionarCompetencias(nome: string, nivel:number){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();

        const competencia = new CandidatoCompetencia(
            idCandidato,
            nome,
            nivel
        );
        
        this.candidatoService.adicionarCompetenciaAoCandidato(idCandidato, competencia);
    }

    atualizarCompetencia(competenciaAtualizada: CandidatoCompetencia): void {
    const idCandidato = this.usuarioService.obterIdUsuarioLogado();
    console.log(this.candidatoService.atualizarCompetenciaDoCandidato(idCandidato, competenciaAtualizada));
}


    excluirCompetencia(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.candidatoService.excluirCompetenciaDoCandidato(idCandidato, idCompetencia);
    }
}
export default PerfilCandidatoCompetenciaController