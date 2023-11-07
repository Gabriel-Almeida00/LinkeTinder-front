import Formacao from "../../modelo/Formacao";
import CandidatoFormacaoApi from "../../api/candidato/candidatoFormacaoApi";

class FormacaoService{
    private api: CandidatoFormacaoApi;

    constructor() {
        this.api = new CandidatoFormacaoApi();
    }

    async obterFormacaoDoCandidatoPorId(id: number ): Promise<Formacao> {
        const response = await this.api.buscarFormacaoPorId(id);
        return await response.data
    }

    async obterFormacoesDoCandidato(candidatoId: number): Promise<Formacao[]> {
       const response = await this.api.listarFormacoesDoCandidato(candidatoId)
       return await response.data
    }

    async adicionarFormacaoAoCandidato( novaFormacao: Formacao):Promise<void> {
       try{
            await this.api.criarFormacao(novaFormacao)
       } catch(error){
        console.log("erro ao criar formação: ", error)
       }
    }

    async atualizarFormacoesDoCandidato(id: number, formacaoAtualizada: Formacao): Promise<boolean> {
        try {
             await this.api.atualizarFormacao(id, formacaoAtualizada)
            return true;
        } catch {
            return false;
        }
    }

    async excluirFormacaoDoCandidato(id: number ): Promise<boolean> {
        try {
            await this.api.excluirFormacao(id);
            return true;
        } catch {
            return false;
        }
    }
}
export default FormacaoService