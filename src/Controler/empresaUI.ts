import Empresa from "../modelo/Empresa";
import EmpresaService from "../service/empresa/EmpresaService";
import VagaDTO from "../modelo/dto/VagaDTO";
import VagaCompetencia from "../modelo/VagaCompetencia";
import VagaService from "../service/vaga/VagaService";
import CompetenciaCandidatoDTO from "../modelo/dto/CompetenciaCandidatoDTO";


class EmpresaUI {
    private empresaService: EmpresaService;
    private vagaService: VagaService

    constructor(empresaService: EmpresaService) {
        this.empresaService = empresaService;
        this.vagaService = new VagaService

        this.adicionarEventoCadastrar();
    }

    private adicionarEventoCadastrar(): void {
        const cadastrarButton = document.getElementById('cadastrar-empresa-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarEmpresa();
            });
        }
    }

    

    private validarCnpj(cnpj: string): boolean {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return cnpjRegex.test(cnpj);
    }

    private validarNome(nome: string): boolean {
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        return nomeRegex.test(nome);
    }

    private validarEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    private validarCep(cep: string): boolean {
        const cepRegex = /^\d{5}-\d{3}$/;
        return cepRegex.test(cep);
    }

    private obterValoresDosCampos(): Empresa | null {
        const nomeInput = document.getElementById('nomeEmpresa') as HTMLInputElement;
        const emailInput = document.getElementById('emailEmpresa') as HTMLInputElement;
        const cepInput = document.getElementById('cepEmpresa') as HTMLInputElement;
        const cnpjInput = document.getElementById('cnpjEmpresa') as HTMLInputElement;
        const paisInput = document.getElementById('paisEmpresa') as HTMLInputElement;
        const estadoInput = document.getElementById('estadoEmpresa') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricaoEmpresa') as HTMLInputElement;
        const senhaInput = document.getElementById('senhaEmpresa') as HTMLInputElement;
        

        if (
            !this.validarCnpj(cnpjInput.value) ||
            !this.validarNome(nomeInput.value) ||
            !this.validarEmail(emailInput.value) ||
            !this.validarCep(cepInput.value)
        ) {
            alert('Por favor, preencha os campos corretamente.');
            return null;
        }

        return new Empresa(
            nomeInput.value,
            emailInput.value,
            paisInput.value,
            cepInput.value,
            descricaoInput.value,
            senhaInput.value,
            cnpjInput.value,
        );
    }

    private limparCamposDoFormulario(): void {
        const camposParaLimpar = ['nomeEmpresa', 'emailEmpresa', 'cepEmpresa', 'cnpjEmpresa',
         'paisEmpresa', 'estadoEmpresa', 'descricaoEmpresa', 'senhaEmpresa'];

        camposParaLimpar.forEach((campo) => {
            const elemento = document.getElementById(campo) as HTMLInputElement;
            elemento.value = '';
        });
    }

    public cadastrarEmpresa(): void {
        const novaEmpresa = this.obterValoresDosCampos();

        if (novaEmpresa) {
            this.empresaService.adicionarEmpresa(novaEmpresa);
            this.limparCamposDoFormulario();
            window.location.href = '../../paginas/login/login.html';
        }
    }

  
}

export default EmpresaUI;
