import TipoUsuario from "../modelo/enum/tipoUsuario";
import Candidato from "../modelo/Candidato";
import Empresa from "../modelo/Empresa";
import Pessoa from "../modelo/Pessoa";

class UsuarioService {
    constructor() {}

    login(email: string, senha: string, userType: TipoUsuario): Pessoa | null {
        const usuarios = this.getUsuariosPorTipo(userType);
        const usuarioExistente = usuarios.find(
          (usuario) => usuario.getEmail() === email && usuario.getSenha() === senha
        );
    
        if (usuarioExistente) {
          this.setUsuarioLogado(usuarioExistente);
          return usuarioExistente;
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

     setUsuarioLogado(usuario: Pessoa): void {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
    }
}

export default UsuarioService;
