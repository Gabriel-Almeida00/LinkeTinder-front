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

    buscarFormacaoPorId(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.formacaoService.obterFormacaoDoCandidatoPorId(idCandidato, idCompetencia);
    }

    listarFormacao(){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        return this.formacaoService.obterFormacoesDoCandidato(idCandidato);
    }

    adicionarFormacao( instituicao: string, curso: string, nivel: number, anoConclusao: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const formacao = new Formacao(idCandidato, instituicao, curso, nivel, anoConclusao);

        this.formacaoService.adicionarFormacaoAoCandidato(idCandidato, formacao);
    }

    atualizarFormacao(formacao: Formacao): void {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.formacaoService.atualizarFormacoesDoCandidato(idCandidato, formacao);
}


    excluirFormacao(idCompetencia: string){
        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        this.formacaoService.excluirFormacaoDoCandidato(idCandidato, idCompetencia);
    }
}
export default CandidatoFormacaoController