import Candidato from "../../modelo/Candidato";
import Empresa from "../../modelo/Empresa";
import Pessoa from "../../modelo/Pessoa";
import TipoUsuario from "../../modelo/enum/TipoUsuario";

interface IUsuarioService{
    login(email: string, senha: string, userType: TipoUsuario): Pessoa | null;
    obterIdUsuarioLogado(): number;
    obterCandidato(idCandidato: number): Candidato;
    obterEmpresa(idEmpresa: number): Empresa;
    getUsuariosPorTipo(userType: TipoUsuario): Pessoa[];
    setUsuarioLogado(idUsuario: number): void ;
} export default IUsuarioService