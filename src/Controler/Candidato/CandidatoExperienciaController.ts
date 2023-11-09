import Experiencia from "../../modelo/Experiencia";
import ExperienciaService from "../../service/candidato/ExperienciaService";
import UsuarioService from "../../service/usuario/UsuarioService";

class PerfilCandidatoExperienciaController {
    private usuarioService: UsuarioService;
    private experienciaService: ExperienciaService;

    constructor(usarioService: UsuarioService, experienciaService: ExperienciaService) {
        this.usuarioService = usarioService
        this.experienciaService = experienciaService
    }

    obterExperienciaPorId(idExperiencia: number){
        return this.experienciaService.obterExperienciaDoCandidatoPorId(idExperiencia);
    }

    listarExperiencias() {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.experienciaService.obterExperienciasDoCandidato(idCandidato);
    }

    adicionarExperiencia(experiencia: Experiencia) {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        experiencia.idCandidato = idCandidato
        this.experienciaService.adicionarExperienciaAoCandidato( experiencia);
    }

    atualizarExperiencia(experiencia: Experiencia){
        console.log(experiencia)
        this.experienciaService.atualizarExperienciaDoCandidato( experiencia.id, experiencia)
    }

    excluirExperiencia(idExperiencia: number) {
        this.experienciaService.excluirExperienciaDoCandidato(idExperiencia);
    }


}
export default PerfilCandidatoExperienciaController;