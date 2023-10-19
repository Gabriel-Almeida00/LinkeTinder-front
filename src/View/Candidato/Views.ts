import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/CandidatoCompetenciaController";
import PerfilCandidatoController from "../../Controler/Candidato/CandidatoController";
import PerfilCandidatoExperienciaController from "../../Controler/Candidato/CandidatoExperienciaController";
import PerfilCandidatoFormacaoController from "../../Controler/Candidato/PerfilCandidatoFormacaoController";
import PerfilCandidatoCompetenciaView from "./CandidatoCompetenciaView";

class CandidatoView {
    private perfilCandidatoFormacaoController!: PerfilCandidatoFormacaoController;


    constructor() {
        if (window.location.href.includes('http://localhost:8080/paginas/candidato/')) {
            this.perfilCandidatoFormacaoController = new PerfilCandidatoFormacaoController();

            this.perfilCandidatoFormacaoController.exibirFormacoesDoCandidato();
        }

    }
}
export default CandidatoView;
