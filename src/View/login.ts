import TipoUsuario from "../modelo/enum/TipoUsuario";
import UsuarioService from "../service/UsuarioService";

const form = document.querySelector('form');
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const senhaInput = document.getElementById('senha') as HTMLInputElement | null; 

const userTypeSelect = document.getElementById('userType') as HTMLSelectElement | null;

const userService = new UsuarioService(); 

if (form && emailInput && senhaInput && userTypeSelect) { 
    form.addEventListener('submit', lidarComEnvioDeFormulario);
} else {
    console.log('Formulário ou elementos não encontrados');
}

function lidarComEnvioDeFormulario(event: Event) {
    event.preventDefault();

    const email = emailInput!.value;
    const senha = senhaInput!.value; 
    const userType = userTypeSelect!.value as TipoUsuario;

    if (email && senha && userType) { 
        const user = userService.login(email, senha, userType); 
        if (user) {
            redirecionarParaPerfil(userType);
        } else {
            alert("Login falhou");
        }
    }
}

function redirecionarParaPerfil(userType: TipoUsuario) {
    if (userType === TipoUsuario.Candidato) {
        window.location.href = '../../paginas/candidato/vagas-cadastradas/vagas-cadastradas.html';
    } else if (userType === TipoUsuario.Empresa) {
        window.location.href = '../../paginas/empresa/candidatos-cadastrados/candidatos-cadastrados.html';
    }
}
