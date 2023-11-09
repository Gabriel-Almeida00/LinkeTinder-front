import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import UsuarioService from "../../service/usuario/UsuarioService";
import CandidatoCompetenciaService from "../../service/candidato/CandidatoCompetenciaService";
import CompetenciaDTO from "../../modelo/dto/CompetenciaDTO";

class PerfilCandidatoCompetenciaController {
    private candidatoCompetenciaService: CandidatoCompetenciaService;
    private usuarioService: UsuarioService;

    constructor() {
        this.candidatoCompetenciaService = new CandidatoCompetenciaService()
        this.usuarioService = new UsuarioService()
    }

    buscarCompetenciaPorId(idCompetencia: number) {
        return this.candidatoCompetenciaService.buscarCompetenciaDoCandidatoPorId(idCompetencia);
    }

    listarCompetencia() {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.candidatoCompetenciaService.listarCompetenciasDoCandidato(idCandidato);
    }

    adicionarCompetencias(competencia: CompetenciaDTO) {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const candidatoCompetencia = new CandidatoCompetencia(idCandidato, competencia.nome, competencia.nivel)
        this.candidatoCompetenciaService.adicionarCompetencia(candidatoCompetencia);
    }

    atualizarCompetencia(competenciaAtualizada: CandidatoCompetencia): void {
        this.candidatoCompetenciaService.atualizarCompetencia(competenciaAtualizada.id, competenciaAtualizada);
    }


    excluirCompetencia(idCompetencia: number) {
        this.candidatoCompetenciaService.excluirCompetencia( idCompetencia);
    }
}
export default PerfilCandidatoCompetenciaController