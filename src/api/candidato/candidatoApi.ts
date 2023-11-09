import axios, { AxiosResponse, AxiosError } from 'axios';
import Candidato from '../../modelo/Candidato';


class CandidatoApi{
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

    listarCandidatos(): Promise<AxiosResponse> {
        return this.api.get('linketinder/candidatos');
      }
    
      buscarCandidatoPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidatos/${id}`);
      }
    
      criarCandidato(candidato: Candidato): Promise<AxiosResponse> {
        return this.api.post('linketinder/candidatos', candidato);
      }
    
      atualizarCandidato(id: number, candidato: Candidato): Promise<AxiosResponse> {
        return this.api.put(`linketinder/candidatos/${id}`, candidato);
      }
    
      excluirCandidato(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/candidatos/${id}`);
      }
}
export default CandidatoApi;