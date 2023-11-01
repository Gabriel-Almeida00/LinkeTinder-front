import axios, { AxiosResponse, AxiosError } from 'axios';
import Competencia from '../../modelo/Competencia';

class CompetenciaApi {
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

  listarCompetencias(): Promise<AxiosResponse> {
    return this.api.get('linketinder/competencia');
  }

  buscarCompetenciaPorId(id: number): Promise<AxiosResponse> {
    return this.api.get(`linketinder/competencia/${id}`);
  }

  criarCompetencia(nomeComeptencia: string): Promise<AxiosResponse> {
    return this.api.post('linketinder/competencia', nomeComeptencia);
  }

  atualizarCompetencia(id: number, nomeComeptencia: string): Promise<AxiosResponse> {
    return this.api.put(`linketinder/competencia/${id}`, nomeComeptencia);
  }

  excluirCompetencia(id: number): Promise<AxiosResponse> {
    return this.api.delete(`linketinder/competencia/${id}`);
  }
}

export default CompetenciaApi;
