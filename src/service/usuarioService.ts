import TipoUsuario from "../modelo/enum/tipoUsuario";
import Candidato from "../modelo/candidato";
import Empresa from "../modelo/empresa";
import Usuario from "../modelo/UsuarioLogado";

class UsuarioService {
    constructor() {}

    login(email: string, nome: string, userType: TipoUsuario): Usuario | null {
        const users = this.getUsuariosPorTipo(userType);

        const existingUser = users.find((user: Usuario) => user.email === email && user.nome === nome);

        if (existingUser) {
            this.setUsuarioLogado(existingUser);
            return existingUser;
        } else {
            throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
        }
    }

    obterCandidatoLogado(): Candidato  {
        const candidatoLogadoJson = localStorage.getItem('usuarioLogado');
        if (candidatoLogadoJson) {
            const candidatoLogado = JSON.parse(candidatoLogadoJson);
            return candidatoLogado as Candidato;
        }
        throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
    }

    obterEmpresaLogado(): Empresa  {
        const empresaLogadoJson = localStorage.getItem('usuarioLogado');
        if (empresaLogadoJson) {
            const empresaLogado = JSON.parse(empresaLogadoJson);
            return empresaLogado as Empresa;
        }
        throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
    }

    private getUsuariosPorTipo(userType: TipoUsuario): Usuario[] {
        const userKey = userType === TipoUsuario.Candidato ? 'candidatos' : 'empresas';
        const usersJson = localStorage.getItem(userKey);
        return usersJson ? JSON.parse(usersJson) : [];
    }

    private setUsuarioLogado(usuario: Usuario): void {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
}

export default UsuarioService;
