import LoginApi from "../../api/login/loginAPI";
import LoginDTO from "../../modelo/dto/LoginDTO";

class LoginService {
    private api: LoginApi

    constructor() {
        this.api = new LoginApi()
    }

    async loginCandidato(login: LoginDTO): Promise<number> {
        const response = await this.api.LoginCandidato(login);
        const candidatoId = response.data;
        this.salvarIdNoLocalStorage(candidatoId)
        
        return candidatoId;
    }

    async loginEmpresa(login: LoginDTO): Promise<number> {
       const response = await this.api.LoginEmpresa(login);
        const empresaId = response.data;
        console.log(empresaId)
        this.salvarIdNoLocalStorage(empresaId);
  
        return empresaId;
    }


    private salvarIdNoLocalStorage(id: number) {
        localStorage.setItem('usuarioId', id.toString());
    }


} export default LoginService;