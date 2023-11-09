import axios, { AxiosResponse } from "axios";
import Formacao from "../../modelo/Formacao";

class CandidatoFormacaoApi{
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

    listarFormacoesDoCandidato(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidatoFormacao/${id}`);
      }
    
      buscarFormacaoPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidato/formacao/${id}`);
      }
    
      criarFormacao(formacao: Formacao): Promise<AxiosResponse> {
        return this.api.post('linketinder/candidatoFormacao', formacao);
      }
    
      atualizarFormacao(id: number, formacao: Formacao): Promise<AxiosResponse> {
        return this.api.put(`linketinder/candidatoFormacao/${id}`, formacao);
      }
    
      excluirFormacao(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/candidatoFormacao/${id}`);
      }
}
export default CandidatoFormacaoApi;