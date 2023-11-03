import LoginService from "../../service/login/LoginService";

class LoginController{
    private loginService: LoginService

    constructor(){
        this.loginService = new LoginService()
    }

    async loginCandidato(login: LoginDTO):Promise<number>{
       return await this.loginService.loginCandidato(login)
    }

    async loginEmpresa(login: LoginDTO): Promise<number>{
        return await this.loginService.loginEmpresa(login)
    }
}
export default LoginController;