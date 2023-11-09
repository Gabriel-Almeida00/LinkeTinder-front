import axios, { AxiosResponse } from "axios";
import VagaCompetencia from "../../modelo/VagaCompetencia";

class VagaCompetenciaApi{
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

    listarCompetencias(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/vagaCompetencia/${id}`);
      }

      buscarCompetenciaPorId(id: number): Promise<AxiosResponse> {
        return this.api.get(`linketinder/vaga/competencia/${id}`);
      }
    
   
      criarCompetencia(competencia: VagaCompetencia): Promise<AxiosResponse> {
        return this.api.post('linketinder/vagaCompetencia', competencia);
      }
    
      atualizarCompetencia(id: number, competencia: VagaCompetencia): Promise<AxiosResponse> {
        return this.api.put(`linketinder/vagaCompetencia/${id}`, competencia);
      }
    
      excluirCompetencia(id: number): Promise<AxiosResponse> {
        return this.api.delete(`linketinder/vagaCompetencia/${id}`);
      }
}
export default VagaCompetenciaApi;