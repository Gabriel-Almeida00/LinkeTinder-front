import PerfilEmpresaController from "../../Controler/Empresa/PerfilEmpresaController";
import PerfilEmpresaVagasController from "../../Controler/Empresa/PerfilEmpresaVagasController";
import VagaCompetenciaController from "../../Controler/Empresa/VagaCompetenciaController";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaCompetenciaView from "./VagaCompetenciaView";


class EmpresaView{
    private perfilEmpresaVagasController!: PerfilEmpresaVagasController; 
    private  vagaCompetenciaView!: VagaCompetenciaView
    private  usuarioService = new UsuarioService();
    private empresaService = new EmpresaService();
    private controller = new VagaCompetenciaController(this.empresaService, this.usuarioService)
   

    constructor(){
        if (window.location.href.includes('http://localhost:8080/paginas/empresa/')) {
            this.perfilEmpresaVagasController = new PerfilEmpresaVagasController();
           this.vagaCompetenciaView = new VagaCompetenciaView(this.controller)

            this.perfilEmpresaVagasController.exibirVagasDaEmpresa();
        }
    }
}
export default EmpresaView;