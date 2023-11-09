import axios, { AxiosResponse } from "axios";
import Candidato from "../../modelo/Candidato";
import Empresa from "../../modelo/Empresa";

class CadastroAPi {
    private api;

    constructor() {
        const baseURL = 'http://localhost:8088/';
        this.api = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    criarCandidato(candidato: Candidato): Promise<AxiosResponse> {
        return this.api.post('linketinder/microservices/cadastro/candidato', candidato);
    }

    criarEmpresa(empresa: Empresa): Promise<AxiosResponse> {
        return this.api.post('linketinder/microservices/cadastro/empresa', empresa);
    }
}
export default CadastroAPi;