import axios, { AxiosResponse, AxiosError } from 'axios';
import LoginDTO from '../../modelo/dto/LoginDTO';

class LoginApi {
  private api;

  constructor() {
    const baseURL = 'http://localhost:8082/';
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  LoginCandidato(login: LoginDTO): Promise<AxiosResponse> {
    return this.api.post('linketinder/login/candidato', login);
  }

  LoginEmpresa(login: LoginDTO): Promise<AxiosResponse> {
    return this.api.post('linketinder/login/empresa', login);
  }
}
export default LoginApi;