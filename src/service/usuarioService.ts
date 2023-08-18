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

}

export default usuarioService;