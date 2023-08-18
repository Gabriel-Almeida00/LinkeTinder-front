import tipoUsuario from "../modelo/enum/tipoUsuario";
import usuarioService from "../service/usuarioService";

const form = document.querySelector('form');
const nomeInput = document.getElementById('nome') as HTMLInputElement | null;
const emailInput = document.getElementById('email') as HTMLInputElement | null;
const userTypeSelect = document.getElementById('userType') as HTMLSelectElement | null;

const userService = new usuarioService(); 

if (form && nomeInput && emailInput && userTypeSelect) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const nome = nomeInput.value;
        const email = emailInput.value;
        const userType = userTypeSelect.value as tipoUsuario;
        if (nome && email && userType) { 
           
            const user = userService.login(email, nome, userType);
            if (user) {
               

                if (userType == tipoUsuario.Candidato) {
                    window.location.href = '../../paginas/perfil-candidato/perfil-candidato.html';
                } else if (userType == tipoUsuario.Empresa) {
                    window.location.href = '../../paginas/perfil-empresa/perfil-empresa.html';
                }
            } else {
                alert("login falhou");
            }
        }
    });
} else {
    console.log('Formulário ou elementos não encontrados');
}





