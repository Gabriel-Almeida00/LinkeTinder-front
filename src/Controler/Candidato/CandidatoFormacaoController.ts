import Formacao from "../../modelo/Formacao";
import FormacaoService from "../../service/FormacaoService";
import UsuarioService from "../../service/usuario/UsuarioService";

class CandidatoFormacaoController {
    private usuarioService: UsuarioService;
    private formacaoService: FormacaoService;

    constructor(usuarioService: UsuarioService, formacaoService: FormacaoService) {
        this.usuarioService = usuarioService;
        this.formacaoService = formacaoService
    }

    buscarFormacaoPorId(idFormacao: number) {
        return this.formacaoService.obterFormacaoDoCandidatoPorId(idFormacao);
    }

    listarFormacao() {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.formacaoService.obterFormacoesDoCandidato(idCandidato);
    }

    adicionarFormacao(formacao: Formacao) {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        formacao.idCandidato = idCandidato
        this.formacaoService.adicionarFormacaoAoCandidato(formacao);
    }

    atualizarFormacao(formacao: Formacao): void {
        this.formacaoService.atualizarFormacoesDoCandidato(formacao.id, formacao);
    }


    excluirFormacao(idFormacao: number) {
        this.formacaoService.excluirFormacaoDoCandidato(idFormacao);
    }
}
export default CandidatoFormacaoController