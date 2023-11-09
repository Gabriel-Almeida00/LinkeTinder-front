import Vaga from "../../modelo/Vaga";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaService from "../../service/vaga/VagaService";

class PerfilEmpresaVagasController {
    private usuarioService: UsuarioService;
    private vagaService: VagaService

    constructor() {
        this.usuarioService = new UsuarioService();
        this.vagaService = new VagaService()
    }

     listarVagas(){
       return this.vagaService.listarVagas()
    }

    buscarVagaDaEmpresaPorId(id: number){
      return this.vagaService.buscarVagaDaEmpresaPorId(id)
  }

     buscarVagasDaEmpresa(){
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        return this.vagaService.buscarVagasDaEmpresa(idEmpresa)
    }


     adicionarVaga(vaga: Vaga){
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        vaga.idEmpresa = idEmpresa
        this.vagaService.adicionarVaga(vaga)
    }

     atualizarVaga(vaga: Vaga){
      this.vagaService.atualizarVaga(vaga.id, vaga)
    }

     excluirVaga(idVaga: number) {
       this.vagaService.excluirVaga(idVaga)
    }
}
export default PerfilEmpresaVagasController;