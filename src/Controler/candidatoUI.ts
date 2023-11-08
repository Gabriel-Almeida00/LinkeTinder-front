import Candidato from "../modelo/Candidato";
import CandidatoService from "../service/candidato/CandidatoService";
import Chart from 'chart.js/auto';
import Formacao from "../modelo/Formacao";
import Experiencia from "../modelo/Experiencia";
import UsuarioService from "../service/usuario/UsuarioService";
import Vaga from "../modelo/Vaga";
import CandidatoCompetencia from "../modelo/CandidatoCompetencia";


export class CandidatoUI {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;

    constructor(candidatoService: CandidatoService, usuarioService: UsuarioService) {
        this.candidatoService = candidatoService;
        this.usuarioService = usuarioService;
        this.setupEventListeners();
    }

    private setupEventListeners(): void {
        const cadastrarButton = document.getElementById('cadastrar-candidato-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarCandidato();
            });
        }
    }

   
    
    private validarCPF(cpf: string): boolean {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }
    
    private validarNome(nome: string): boolean {
        const nomeRegex = /^[a-zA-Z\s]+$/;
        return nomeRegex.test(nome);
    }
    
    private validarEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    
    private validarTelefone(telefone: string): boolean {
        const telefoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
        return telefoneRegex.test(telefone);
    }
    
    private validarLinkedin(linkedin: string): boolean {
        const linkedinRegex = /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;
        return linkedinRegex.test(linkedin);
    }
    
    private obterValoresDosCampos(): Candidato | null {
        const nomeInput = document.getElementById('nome') as HTMLInputElement;
        const sobrenomeInput = document.getElementById('sobrenome') as HTMLInputElement;
        const dataNascimentoInput = document.getElementById('dataNascimento') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const paisInput = document.getElementById('pais') as HTMLInputElement;
        const cepInput = document.getElementById('cep') as HTMLInputElement;
        const cpfInput = document.getElementById('cpf') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricao') as HTMLInputElement;
        const senhaInput = document.getElementById('senha') as HTMLInputElement;
        const linkedinInput = document.getElementById('linkedin') as HTMLInputElement;
        const telefoneInput = document.getElementById('telefone') as HTMLInputElement;


        if (
            !this.validarCPF(cpfInput.value) ||
            !this.validarNome(nomeInput.value) ||
            !this.validarEmail(emailInput.value) ||
            !this.validarTelefone(telefoneInput.value) ||
            !this.validarLinkedin(linkedinInput.value)
        ) {
            alert('Por favor, preencha os campos corretamente.');
        }
    
        const dataNascimentoValue = dataNascimentoInput.value;
        const dataNascimento = new Date(dataNascimentoValue);

    
        return new Candidato(
           nomeInput.value,
           emailInput.value,
           paisInput.value,
           cepInput.value,
           linkedinInput.value,
           telefoneInput.value,
           descricaoInput.value,
           senhaInput.value,
           sobrenomeInput.value,
           dataNascimento,
           cpfInput.value
        );
    }
    
    public cadastrarCandidato(): void {
        const novoCandidato = this.obterValoresDosCampos();
        
        if (novoCandidato) {
            this.candidatoService.adicionarCandidato(novoCandidato);
            this.limparCamposDoFormulario();
           window.location.href = '../../paginas/login/login.html';
        }
    }
    
    private limparCamposDoFormulario(): void {
        const camposParaLimpar = ['nome', 'sobrenome', 'dataNascimento', 'email', 'pais', 'cep',
         'cpf', 'descricao', 'senha', 'linkedin', 'telefone'];
        
        camposParaLimpar.forEach((campo) => {
            const elemento = document.getElementById(campo) as HTMLInputElement;
            elemento.value = '';
        });
    }
    
    
   
}
export default CandidatoUI;