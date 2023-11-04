import axios, { AxiosResponse } from "axios";
import Candidato from "../../modelo/Candidato";
import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";

class CandidatoCompetenciaApi{
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

    listarCompetenciasDoCandidato(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidatoCompetencia/${id}`);
      }
    
      buscarCompetenciaDoCandidatoPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/candidato/competencia/${id}`);
      }
    
      criarCompetencia(competencia: CandidatoCompetencia): Promise<AxiosResponse> {
        return this.api.post(`linketinder/candidatoCompetencia`, competencia);
      }
    
      atualizarCompetencia(id: number, competencia: CandidatoCompetencia): Promise<AxiosResponse> {
        return this.api.put(`linketinder/candidatoCompetencia/${id}`, competencia);
      }
    
      excluirCompetencia(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/candidatoCompetencia/${id}`);
      }

}
export default CandidatoCompetenciaApi;