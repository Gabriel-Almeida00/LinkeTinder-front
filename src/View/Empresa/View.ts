import PerfilEmpresaController from "../../Controler/Empresa/PerfilEmpresaController";
import PerfilEmpresaVagasController from "../../Controler/Empresa/PerfilEmpresaVagasController";
import VagaCompetenciaController from "../../Controler/Empresa/VagaCompetenciaController";
import EmpresaService from "../../service/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaCompetenciaView from "./VagaCompetenciaView";


class EmpresaView{
    private perfilEmpresaController!: PerfilEmpresaController;
    private perfilEmpresaVagasController!: PerfilEmpresaVagasController; 
    private  vagaCompetenciaView!: VagaCompetenciaView
    private  usuarioService = new UsuarioService();
    private empresaService = new EmpresaService();
    private controller = new VagaCompetenciaController(this.empresaService, this.usuarioService)
   

    constructor(){
        if (window.location.href.includes('http://localhost:8080/paginas/empresa/')) {
            this.perfilEmpresaController = new PerfilEmpresaController();
            this.perfilEmpresaVagasController = new PerfilEmpresaVagasController();
           this.vagaCompetenciaView = new VagaCompetenciaView(this.controller)

            this.perfilEmpresaController.exibirInformacoesEmpresaNoHTML();
            this.perfilEmpresaVagasController.exibirVagasDaEmpresa();
        }
    }
}
export default EmpresaView;