import axios, { AxiosResponse } from "axios";
import Vaga from "../../modelo/Vaga";

class VagaApi{
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

    listarVagas(): Promise<AxiosResponse> {
        return this.api.get('linketinder/vaga');
      }

      buscarVagaDaEmpresaPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/empresa/vaga/${id}`);
      }
    
      buscarVagasDaEmpresa(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/vaga/${id}`);
      }
    
      criarVaga(vaga: Vaga): Promise<AxiosResponse> {
        return this.api.post('linketinder/vaga', vaga);
      }
    
      atualizarVaga(id: number, vaga: Vaga): Promise<AxiosResponse> {
        return this.api.put(`linketinder/vaga/${id}`, vaga);
      }
    
      excluirVaga(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/vaga/${id}`);
      }
}
export default VagaApi;