import Candidato from "../../modelo/Candidato";
import Empresa from "../../modelo/Empresa";
import Pessoa from "../../modelo/Pessoa";
import TipoUsuario from "../../modelo/enum/TipoUsuario";

interface IUsuarioService{
    login(email: string, senha: string, userType: TipoUsuario): Pessoa | null;
    obterIdUsuarioLogado(): string;
    obterCandidato(idCandidato: string): Candidato;
    obterEmpresa(idEmpresa: string): Empresa;
    getUsuariosPorTipo(userType: TipoUsuario): Pessoa[];
    setUsuarioLogado(idUsuario: string): void ;
} export default IUsuarioService