import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/PerfilCandidatoCompetenciaController";
import PerfilCandidatoController from "../../Controler/Candidato/PerfilCandidatoController";
import PerfilCandidatoExperienciaController from "../../Controler/Candidato/PerfilCandidatoExperienciaController";
import PerfilCandidatoFormacaoController from "../../Controler/Candidato/PerfilCandidatoFormacaoController";

class CandidatoView {
    private perfilCandidatoCompetenciaController!: PerfilCandidatoCompetenciaController;
    private perfilCandidatoExperienciaController!: PerfilCandidatoExperienciaController;
    private perfilCandidatoFormacaoController!: PerfilCandidatoFormacaoController;
    private perfilCandidatoController!: PerfilCandidatoController;

    constructor() {
        if (window.location.href.includes('http://localhost:8080/paginas/candidato/')) {
            this.perfilCandidatoCompetenciaController = new PerfilCandidatoCompetenciaController();
            this.perfilCandidatoExperienciaController = new PerfilCandidatoExperienciaController();
            this.perfilCandidatoFormacaoController = new PerfilCandidatoFormacaoController();
            this.perfilCandidatoController = new PerfilCandidatoController();
            
            this.perfilCandidatoCompetenciaController.exibirCompetenciasDoCandidato();
            this.perfilCandidatoExperienciaController.exibirExperienciaDoCandidato();
            this.perfilCandidatoFormacaoController.exibirFormacoesDoCandidato();
            this.perfilCandidatoController.exibirInformacoesCandidatoNoHTML();
        }

    }
}
export default CandidatoView;
