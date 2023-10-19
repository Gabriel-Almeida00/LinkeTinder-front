import Experiencia from "../../modelo/Experiencia";
import ExperienciaService from "../../service/ExperienciaService";
import UsuarioService from "../../service/usuario/UsuarioService";

class PerfilCandidatoExperienciaController {
    private usuarioService: UsuarioService;
    private experienciaService: ExperienciaService;

    constructor(usarioService: UsuarioService, experienciaService: ExperienciaService) {
        this.usuarioService = usarioService
        this.experienciaService = experienciaService
    }

    obterExperienciaPorId(idExperiencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.experienciaService.obterExperienciaDoCanddatoPorId(idCandidato,idExperiencia);
    }

    listarExperiencias() {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.experienciaService.obterExperienciasDoCandidato(idCandidato);
    }

    adicionarExperiencia(cargo: string, empresa: string, nivel: number) {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const experiencia = new Experiencia(idCandidato, cargo, empresa, nivel )

        this.experienciaService.adicionarExperienciaAoCandidato(idCandidato, experiencia);
    }

    atualizarExperiencia(experiencia: Experiencia){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.experienciaService.atualizarExperienciasDoCandidato(idCandidato, experiencia)
    }

    excluirExperiencia(idExperiencia: string) {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.experienciaService.excluirExperienciaDoCandidato(idCandidato, idExperiencia);
    }


}
export default PerfilCandidatoExperienciaController;