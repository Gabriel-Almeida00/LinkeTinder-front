import axios, { AxiosResponse } from "axios";
import Candidato from "../../modelo/Candidato";
import Empresa from "../../modelo/Empresa";

class EmpresaApi{
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

    listarEmpresas(): Promise<AxiosResponse> {
        return this.api.get('linketinder/empresa');
      }
    
      buscarEmpresaPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/empresa/${id}`);
      }
    
      criarEmpresa(empresa: Empresa): Promise<AxiosResponse> {
        return this.api.post('linketinder/empresa', empresa);
      }
    
      atualizarEmpresa(id: number, empresa: Empresa): Promise<AxiosResponse> {
        return this.api.put(`linketinder/empresa/${id}`, empresa);
      }
    
      excluirEmpresa(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/empresa/${id}`);
      }
}
export default EmpresaApi;