import Candidato from "../modelo/candidato";
import Empresa from "../modelo/empresa";
import tipoUsuario from "../modelo/enum/tipoUsuario";
import Usuario from "../modelo/usuario";

class usuarioService{
    constructor() {}

    login(email: string, nome: string, userType: tipoUsuario): Usuario | null {
        const userKey = userType === tipoUsuario.Candidato ? 'candidatos' : 'empresas';
        const usersJson = localStorage.getItem(userKey);
        const users: Usuario[] = usersJson ? JSON.parse(usersJson) : [];

        const existingUser = users.find((user: Usuario) => user.email === email && user.nome === nome);

        if (existingUser) {
            localStorage.setItem('usuarioLogado', JSON.stringify(existingUser));
            return existingUser;
        } else {
            console.log('Login falhou');
            return null;
        }
    }

    obterCandidatoLogado(): Candidato | null {
        const candidatoLogadoJson = localStorage.getItem('usuarioLogado');
        if (candidatoLogadoJson) {
            const candidatoLogado = JSON.parse(candidatoLogadoJson);
            return candidatoLogado as Candidato;
        }
        return null;
    }

    obterEmpresaLogado(): Empresa | null {
        const empresaLogadoJson = localStorage.getItem('usuarioLogado');
        if (empresaLogadoJson) {
            const empresaLogado = JSON.parse(empresaLogadoJson);
            return empresaLogado as Empresa;
        }
        return null;
    }

}

export default usuarioService;