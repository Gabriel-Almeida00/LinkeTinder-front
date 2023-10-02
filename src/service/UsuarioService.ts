import TipoUsuario from "../modelo/enum/TipoUsuario";
import Candidato from "../modelo/Candidato";
import Empresa from "../modelo/Empresa";
import Pessoa from "../modelo/Pessoa";

class UsuarioService {
    constructor() { }

    login(email: string, senha: string, userType: TipoUsuario): Pessoa | null {
        const usuarios = this.getUsuariosPorTipo(userType);
        console.log(usuarios)
        const usuarioExistente = usuarios.find(
            (usuario) => usuario.email === email && usuario.senha === senha
        );
        console.log(usuarioExistente)

        if (usuarioExistente) {
            this.setUsuarioLogado(usuarioExistente.id);
            return usuarioExistente;
        } else {
            throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
        }
    }


    obterIdUsuarioLogado(): string {
        const idUsuarioLogadoJson = localStorage.getItem('usuarioLogado');
        return idUsuarioLogadoJson ? JSON.parse(idUsuarioLogadoJson) : null;
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

    obterEmpresa(idEmpresa: string): Empresa {
        const empresaJson = localStorage.getItem('empresas')

        if(empresaJson){
            const empresas = JSON.parse(empresaJson) as Empresa[];
            const empresaEncontrada = empresas.find((empresa) => empresa.id === idEmpresa);

            if(empresaEncontrada){
                return empresaEncontrada;
            }
        }
        throw new UsuarioNaoEncontradoException('Usuário não encontrado.');
    }

    getUsuariosPorTipo(userType: TipoUsuario): Pessoa[] {
        const userKey = userType === TipoUsuario.Candidato ? 'candidatos' : 'empresas';
        const usersJson = localStorage.getItem(userKey);
    
        if (!usersJson) {
            return [];
        }
    
        const usuarios = JSON.parse(usersJson) as any[];
    
        const usuariosConvertidos: Pessoa[] = usuarios.map((usuario) => {
            if (userType === TipoUsuario.Candidato) {
                return this.convertToCandidato(usuario);
            } else if (userType === TipoUsuario.Empresa) {
                return this.convertToEmpresa(usuario);
            }
            return null;
        }).filter((usuario) => usuario !== null) as Pessoa[];
    
        return usuariosConvertidos;
    }
    
    private convertToCandidato(usuario: any): Candidato | null {
        const candidatoProps = [
            'nome', 'email', 'pais', 'cep', 'redeSocial', 'telefone', 'descricao', 'senha',
            'sobrenome', 'dataNascimento', 'cpf'
        ];
        
        if (!candidatoProps.every((prop) => prop in usuario)) {
            return null;
        }
    
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
        return candidato;
    }
    
    private convertToEmpresa(usuario: any): Empresa | null {
        const empresaProps = [
            'nome', 'email', 'pais', 'cep', 'descricao', 'senha', 'cnpj'
        ];
    
        if (!empresaProps.every((prop) => prop in usuario)) {
            return null;
        }
    
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
        return empresa;
    }
    

    setUsuarioLogado(idUsuario: string): void {
        localStorage.setItem('usuarioLogado', JSON.stringify(idUsuario));
    }
}

export default UsuarioService;
