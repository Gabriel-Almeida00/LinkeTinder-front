import axios, { AxiosResponse } from "axios";
import Experiencia from "../../modelo/Experiencia";

class CandidatoExperienciaApi{
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

    listarExperienciasDoCandidato(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidatoExperiencia/${id}`);
      }
    
      buscarExperienciaPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidato/experiencia/${id}`);
      }
    
      criarExperiencia(experiencia: Experiencia): Promise<AxiosResponse> {
        return this.api.post('linketinder/candidatoExperiencia', experiencia);
      }
    
      atualizarExperiencia(id: number, experiencia: Experiencia): Promise<AxiosResponse> {
        return this.api.put(`linketinder/candidatoExperiencia/${id}`, experiencia);
      }
    
      excluirExperiencia(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/candidatoExperiencia/${id}`);
      }
}
export default CandidatoExperienciaApi;