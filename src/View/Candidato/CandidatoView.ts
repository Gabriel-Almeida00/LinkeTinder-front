import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/PerfilCandidatoCompetenciaController";
import PerfilCandidatoController from "../../Controler/Candidato/PerfilCandidatoController";
import PerfilCandidatoExperienciaController from "../../Controler/Candidato/PerfilCandidatoExperienciaController";
import PerfilCandidatoFormacaoController from "../../Controler/Candidato/PerfilCandidatoFormacaoController";
import PerfilCandidatoCompetenciaView from "./PerfilCandidatoCompetenciaView";

class CandidatoView {
    private perfilCandidatoExperienciaController!: PerfilCandidatoExperienciaController;
    private perfilCandidatoFormacaoController!: PerfilCandidatoFormacaoController;
    private perfilCandidatoController!: PerfilCandidatoController;


    constructor() {
        if (window.location.href.includes('http://localhost:8080/paginas/candidato/')) {
            this.perfilCandidatoExperienciaController = new PerfilCandidatoExperienciaController();
            this.perfilCandidatoFormacaoController = new PerfilCandidatoFormacaoController();
            this.perfilCandidatoController = new PerfilCandidatoController();

            this.perfilCandidatoExperienciaController.exibirExperienciaDoCandidato();
            this.perfilCandidatoFormacaoController.exibirFormacoesDoCandidato();
            this.perfilCandidatoController.exibirInformacoesCandidatoNoHTML();
        }

    }
}
export default CandidatoView;
