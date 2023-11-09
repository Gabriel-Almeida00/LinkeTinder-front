import LoginController from "../../Controler/Login/LoginController";
import LoginDTO from "../../modelo/dto/LoginDTO";
import TipoUsuario from "../../modelo/enum/TipoUsuario";

class LoginView {
    private controller: LoginController;

    constructor() {
        this.controller = new LoginController();
        this.configurarEventListeners()
    }

     configurarEventListeners() {
        const loginButton = document.getElementById('login') as HTMLButtonElement;
        if (loginButton) {
            loginButton.addEventListener('click', () => {
                this.login();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            email:  document.getElementById('email') as HTMLInputElement,
            senha:  document.getElementById('senha') as HTMLInputElement
        };

        const login = new LoginDTO(
              elements.email.value,
              elements.senha.value
        )

        return login;
    }

    pegarTipousuario(){
        const tipoUsuarioSelect = document.getElementById('userType') as HTMLSelectElement
        const tipoUsuario = tipoUsuarioSelect.value as TipoUsuario;
        return tipoUsuario;
    }

    login(){
        const tipoUsuario = this.pegarTipousuario();
        const login = this.pegarValoresDoFormulario();

        if(tipoUsuario == TipoUsuario.Candidato){
            this.controller.loginCandidato(login)
            this.redirecionarParaPerfil(tipoUsuario)
        }else if(tipoUsuario == TipoUsuario.Empresa){
            console.log(login)
            this.controller.loginEmpresa(login)
            this.redirecionarParaPerfil(tipoUsuario)
        }
    }

    redirecionarParaPerfil(tipoUsuario: TipoUsuario){
        if (tipoUsuario === TipoUsuario.Candidato) {
            window.location.href = '../../paginas/candidato/vagas-cadastradas/vagas-cadastradas.html';
        } else if (tipoUsuario === TipoUsuario.Empresa) {
            window.location.href = '../../paginas/empresa/candidatos-cadastrados/candidatos-cadastrados.html';
        }
    }

} export default LoginView;