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

        const nomeElement = document.getElementById('nomeEmpresa') as HTMLInputElement;
        if (nomeElement) {
            nomeElement.value = empresa.nome;
        }

        const emailElement = document.getElementById('emailEmpresa') as HTMLInputElement;
        if (emailElement) {
            emailElement.value = empresa.email;
        }

        const paisElement = document.getElementById('paisEmpresa') as HTMLInputElement;
        if (paisElement) {
            paisElement.value = empresa.pais;
        }

        const cepElement = document.getElementById('cepEmpresa') as HTMLInputElement;
        if (cepElement) {
            cepElement.value = empresa.cep;
        }

        const cnpjElement = document.getElementById('cnpjEmpresa') as HTMLInputElement;
        if (cnpjElement) {
            cnpjElement.value = empresa.cnpj;
        }

        const senhaElement = document.getElementById('senhaEmpresa') as HTMLInputElement;
        if (senhaElement) {
            senhaElement.value = empresa.senha;
        }

        const descricaoElement = document.getElementById('descricaoEmpresa') as HTMLInputElement;
        if (descricaoElement) {
            descricaoElement.value = empresa.descricao;
        }

    }

    salvarInformacoesEmpresa(){
        try{
            const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
            const empresaExistente = this.usuarioService.obterEmpresa(idEmpresa);

            const nomeElement = document.getElementById('nomeEmpresa') as HTMLInputElement;
            const emailElement = document.getElementById('emailEmpresa') as HTMLInputElement;
            const paisElement = document.getElementById('paisEmpresa') as HTMLInputElement;
            const cepElement = document.getElementById('cepEmpresa') as HTMLInputElement;
            const cnpjElement = document.getElementById('cnpjEmpresa') as HTMLInputElement;
            const senhaElement = document.getElementById('senhaEmpresa') as HTMLInputElement;
            const descricaoElement = document.getElementById('descricaoEmpresa') as HTMLInputElement;
            
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