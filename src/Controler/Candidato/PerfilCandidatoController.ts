import CandidatoService from "../../service/CandidatoService";
import UsuarioService from "../../service/UsuarioService";

class PerfilCandidatoController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;

    constructor() {
        this.candidatoService = new CandidatoService();
        this.usuarioService = new UsuarioService();

        const salvarButton = document.getElementById('salvar-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.salvarInformacoesCandidato();
            });
        }
    }

    exibirInformacoesCandidatoNoHTML() {
       const idCanddato = this.usuarioService.obterIdUsuarioLogado()
       const usuarioLogado = this.usuarioService.obterCandidato(idCanddato)
       

            const nomeElement = document.getElementById('nomeCandidato') as HTMLInputElement;
            if (nomeElement) {
                nomeElement.value = usuarioLogado.nome;
            }

            const sobrenomeElement = document.getElementById('sobrenomeCandidato') as HTMLInputElement;
            if (sobrenomeElement) {
                sobrenomeElement.value = usuarioLogado.sobrenome;
            }

            const dataNascimentoElement = document.getElementById('dataNascimentoCandidato') as HTMLInputElement;
            if (dataNascimentoElement) {
                const dataNascimento = new Date(usuarioLogado.dataNascimento);
                const dataNascimentoFormatada = dataNascimento.toISOString().split('T')[0];
                dataNascimentoElement.value = dataNascimentoFormatada;
            }

            const emailElement = document.getElementById('emailCandidato') as HTMLInputElement;
            if (emailElement) {
                emailElement.value = usuarioLogado.email;
            }

            const paisElement = document.getElementById('paisCandidato') as HTMLInputElement;
            if (paisElement) {
                paisElement.value = usuarioLogado.pais;
            }

            const cepElement = document.getElementById('cepCandidato') as HTMLInputElement;
            if (cepElement) {
                cepElement.value = usuarioLogado.cep;
            }

            const cpfElement = document.getElementById('cpfCandidato') as HTMLInputElement;
            if (cpfElement) {
                cpfElement.value = usuarioLogado.cpf;
            }

            const linkedinElement = document.getElementById('linkedinCandidato') as HTMLInputElement;
            if (linkedinElement) {
                linkedinElement.value = usuarioLogado.redeSocial;
            }

            const descricaoElement = document.getElementById('descricaoCandidato') as HTMLTextAreaElement;
            if (descricaoElement) {
                descricaoElement.value = usuarioLogado.descricao;
            }

            const telefoneElement = document.getElementById('telefoneCandidato') as HTMLInputElement;
            if (telefoneElement) {
                telefoneElement.value = usuarioLogado.telefone;
            }

            const senhaElement = document.getElementById('senhaCandidato') as HTMLInputElement;
            if (senhaElement) {
                senhaElement.value = usuarioLogado.senha;
            }
    }

    salvarInformacoesCandidato() {
        try {
            const idCanddato = this.usuarioService.obterIdUsuarioLogado()
            const candidatoExistente = this.usuarioService.obterCandidato(idCanddato);

            const nomeElement = document.getElementById('nomeCandidato') as HTMLInputElement;
            const sobrenomeElement = document.getElementById('sobrenomeCandidato') as HTMLInputElement;
            const dataNascimentoElement = document.getElementById('dataNascimentoCandidato') as HTMLInputElement;
            const emailElement = document.getElementById('emailCandidato') as HTMLInputElement;
            const paisElement = document.getElementById('paisCandidato') as HTMLInputElement;
            const cepElement = document.getElementById('cepCandidato') as HTMLInputElement;
            const cpfElement = document.getElementById('cpfCandidato') as HTMLInputElement;
            const linkedinElement = document.getElementById('linkedinCandidato') as HTMLInputElement;
            const descricaoElement = document.getElementById('descricaoCandidato') as HTMLTextAreaElement;
            const telefoneElement = document.getElementById('telefoneCandidato') as HTMLInputElement;
            const senhaElement = document.getElementById('senhaCandidato') as HTMLInputElement;

            const dataNascimentoString = dataNascimentoElement.value;
            const dataNascimento = new Date(dataNascimentoString);

            candidatoExistente.nome = nomeElement.value
            candidatoExistente.sobrenome = sobrenomeElement.value
            candidatoExistente.dataNascimento = dataNascimento
            candidatoExistente.email = emailElement.value
            candidatoExistente.pais = paisElement.value
            candidatoExistente.cep = cepElement.value
            candidatoExistente.cpf = cpfElement.value
            candidatoExistente.redeSocial = linkedinElement.value
            candidatoExistente.descricao = descricaoElement.value
            candidatoExistente.telefone = telefoneElement.value
            candidatoExistente.senha = senhaElement.value

            this.candidatoService.atualizarCandidatoNoLocalStorage(candidatoExistente);
            this.exibirInformacoesCandidatoNoHTML();
        } catch (error) {
            console.error('Erro ao salvar informações do candidato:', error);
        }
    }
}
export default PerfilCandidatoController
