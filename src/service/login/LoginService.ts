import LoginApi from "../../api/login/loginAPI";

class LoginService {
    private api: LoginApi

    constructor() {
        this.api = new LoginApi()
    }

    async loginCandidato(login: LoginDTO): Promise<number> {
        const response = await this.api.LoginCandidato(login);
        return response.data;
    }

    async loginEmpresa(login: LoginDTO): Promise<number> {
        const response = await this.api.LoginEmpresa(login);
        return response.data;
    }


} export default LoginService;