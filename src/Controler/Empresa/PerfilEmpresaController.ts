import Empresa from "../../modelo/Empresa";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";

class PerfilEmpresaController {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;

    constructor() {
        this.empresaService = new EmpresaService();
        this.usuarioService = new UsuarioService();
    }


    exibirInformacoesEmpresaNoHTML() {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        return this.empresaService.obterEmpresaPorId(idEmpresa) 
    }

    salvarInformacoesEmpresa(empresa: Empresa) {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        return  this.empresaService.atualizarEmpresa(idEmpresa ,empresa);
    }
}
export default PerfilEmpresaController;