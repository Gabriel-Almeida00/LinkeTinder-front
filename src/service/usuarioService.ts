import TipoUsuario from "../modelo/enum/tipoUsuario";
import Candidato from "../modelo/Candidato";
import Empresa from "../modelo/Empresa";
import Pessoa from "../modelo/Pessoa";

class UsuarioService {
    constructor() { }

    login(email: string, senha: string, userType: TipoUsuario): Pessoa | null {
        const usuarios = this.getUsuariosPorTipo(userType);
        console.log(usuarios)
        const usuarioExistente = usuarios.find(
            (usuario) => usuario.getEmail() === email && usuario.getSenha() === senha
        );
        console.log(usuarioExistente)

        if (usuarioExistente) {
            this.setUsuarioLogado(usuarioExistente.id);
            return usuarioExistente;
        } else {
            throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
        }
    }

    obterCandidato(idCandidato: string): Candidato {
        const candidatosJson = localStorage.getItem('candidatos');

        if (candidatosJson) {
            const candidatos = JSON.parse(candidatosJson) as Candidato[];

            const candidatoEncontrado = candidatos.find((candidato) => candidato.id === idCandidato);

            if (candidatoEncontrado) {
                return candidatoEncontrado;
            }
        }
        throw new UsuarioNaoEncontradoException('Usuário não encontrado.');

    }

    obterIdCandidatoLogado(): string {
        const idUsuarioLogadoJson = localStorage.getItem('usuarioLogado');
        return idUsuarioLogadoJson ? JSON.parse(idUsuarioLogadoJson) : null;
    }

    obterEmpresaLogado(): Empresa {
        const empresaLogadoJson = localStorage.getItem('usuarioLogado');
        if (empresaLogadoJson) {
            const empresaLogado = JSON.parse(empresaLogadoJson);
            return empresaLogado as Empresa;
        }
        throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
    }

    getUsuariosPorTipo(userType: TipoUsuario): Pessoa[] {
        const userKey = userType === TipoUsuario.Candidato ? 'candidatos' : 'empresas';
        const usersJson = localStorage.getItem(userKey);

        if (usersJson) {
            const usuarios = JSON.parse(usersJson) as any[];

            const usuariosConvertidos: Pessoa[] = [];

            for (const usuario of usuarios) {
                if (userType === TipoUsuario.Candidato) {
                    const candidato = new Candidato(
                        usuario.nome,
                        usuario.email,
                        usuario.pais,
                        usuario.cep,
                        usuario.redeSocial,
                        usuario.telefone,
                        usuario.descricao,
                        usuario.senha,
                        usuario.sobrenome,
                        new Date(usuario.dataNascimento),
                        usuario.cpf,
                        TipoUsuario.Candidato
                    );
                    candidato.setId(usuario.id);
                    usuariosConvertidos.push(candidato);
                }
                else if (userType === TipoUsuario.Empresa) {
                    const empresa = new Empresa(
                        usuario.nome,
                        usuario.email,
                        usuario.pais,
                        usuario.cep,
                        usuario.descricao,
                        usuario.senha,
                        usuario.cnpj,
                        TipoUsuario.Empresa
                    );
                    empresa.setId(usuario.id);
                    usuariosConvertidos.push(empresa);
                }
            }

            return usuariosConvertidos;
        } else {
            return [];
        }
    }

    setUsuarioLogado(idUsuario: string): void {
        localStorage.setItem('usuarioLogado', JSON.stringify(idUsuario));
    }
}

export default UsuarioService;
