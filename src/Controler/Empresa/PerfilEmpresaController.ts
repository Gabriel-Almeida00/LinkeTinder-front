import EmpresaService from "../../service/EmpresaService";
import UsuarioService from "../../service/usuarioService";

class PerfilEmpresaController {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;

    constructor() {
        this.empresaService = new EmpresaService();
        this.usuarioService = new UsuarioService();

        const salvarButton = document.getElementById('atualizar-empresa-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.salvarInformacoesEmpresa();
            });
        }
    }

    exibirInformacoesEmpresaNoHTML(){
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        const empresa = this.usuarioService.obterEmpresa(idEmpresa)

        const nomeElement = document.getElementById('empresaNome') as HTMLInputElement;
        if (nomeElement) {
            nomeElement.value = empresa.nome;
        }

        const emailElement = document.getElementById('empresaEmail') as HTMLInputElement;
        if (emailElement) {
            emailElement.value = empresa.email;
        }

        const paisElement = document.getElementById('empresaPais') as HTMLInputElement;
        if (paisElement) {
            paisElement.value = empresa.pais;
        }

        const cepElement = document.getElementById('empresaCep') as HTMLInputElement;
        if (cepElement) {
            cepElement.value = empresa.cep;
        }

        const cnpjElement = document.getElementById('empresaCnpj') as HTMLInputElement;
        if (cnpjElement) {
            cnpjElement.value = empresa.cnpj;
        }

        const senhaElement = document.getElementById('empresaSenha') as HTMLInputElement;
        if (senhaElement) {
            senhaElement.value = empresa.senha;
        }

        const descricaoElement = document.getElementById('empresaDescricao') as HTMLInputElement;
        if (descricaoElement) {
            descricaoElement.value = empresa.descricao;
        }

    }

    salvarInformacoesEmpresa(){
        try{
            const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
            const empresaExistente = this.usuarioService.obterEmpresa(idEmpresa);

            const nomeElement = document.getElementById('empresaNome') as HTMLInputElement;
            const emailElement = document.getElementById('empresaEmail') as HTMLInputElement;
            const paisElement = document.getElementById('empresaPais') as HTMLInputElement;
            const cepElement = document.getElementById('empresaCep') as HTMLInputElement;
            const cnpjElement = document.getElementById('empresaCnpj') as HTMLInputElement;
            const senhaElement = document.getElementById('empresaSenha') as HTMLInputElement;
            const descricaoElement = document.getElementById('empresaDescricao') as HTMLInputElement;
            
            empresaExistente.nome = nomeElement.value;
            empresaExistente.email = emailElement.value;
            empresaExistente.pais = paisElement.value;
            empresaExistente.cep = cepElement.value;
            empresaExistente.cnpj = cnpjElement.value;
            empresaExistente.senha = senhaElement.value;
            empresaExistente.descricao = descricaoElement.value;

            this.empresaService.atualizarEmpresaNoLocalStorage(empresaExistente);
            this.exibirInformacoesEmpresaNoHTML();
        }catch (error) {
            console.error('Erro ao salvar informações da empresa:', error);
        }
    }


}
export default PerfilEmpresaController;