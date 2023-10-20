import PerfilEmpresaCompetenciaVagaController from "../../Controler/Empresa/VagaCompetenciaController";
import PerfilEmpresaController from "../../Controler/Empresa/PerfilEmpresaController";
import PerfilEmpresaVagasController from "../../Controler/Empresa/PerfilEmpresaVagasController";

class EmpresaView{
    private perfilEmpresaController!: PerfilEmpresaController;
    private perfilEmpresaVagasController!: PerfilEmpresaVagasController; 
    private perfilEmpresaCompetenciaVagaController!: PerfilEmpresaCompetenciaVagaController;

    constructor(){
        if (window.location.href.includes('http://localhost:8080/paginas/empresa/')) {
            this.perfilEmpresaController = new PerfilEmpresaController();
            this.perfilEmpresaVagasController = new PerfilEmpresaVagasController();
            this.perfilEmpresaCompetenciaVagaController = new PerfilEmpresaCompetenciaVagaController();

            this.perfilEmpresaController.exibirInformacoesEmpresaNoHTML();
            this.perfilEmpresaVagasController.exibirVagasDaEmpresa();
        }
    }
}
export default EmpresaView;