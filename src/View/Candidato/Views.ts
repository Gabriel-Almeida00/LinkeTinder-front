import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/CandidatoCompetenciaController";
import PerfilCandidatoController from "../../Controler/Candidato/CandidatoController";
import PerfilCandidatoExperienciaController from "../../Controler/Candidato/PerfilCandidatoExperienciaController";
import PerfilCandidatoFormacaoController from "../../Controler/Candidato/PerfilCandidatoFormacaoController";
import PerfilCandidatoCompetenciaView from "./CandidatoCompetenciaView";

class CandidatoView {
    private perfilCandidatoExperienciaController!: PerfilCandidatoExperienciaController;
    private perfilCandidatoFormacaoController!: PerfilCandidatoFormacaoController;


    constructor() {
        if (window.location.href.includes('http://localhost:8080/paginas/candidato/')) {
            this.perfilCandidatoExperienciaController = new PerfilCandidatoExperienciaController();
            this.perfilCandidatoFormacaoController = new PerfilCandidatoFormacaoController();

            this.perfilCandidatoExperienciaController.exibirExperienciaDoCandidato();
            this.perfilCandidatoFormacaoController.exibirFormacoesDoCandidato();
        }

    }
}
export default CandidatoView;
