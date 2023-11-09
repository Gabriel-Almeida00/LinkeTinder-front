import CompetenciaApi from "../../api/competencia/competenciaApi";
import Competencia from "../../modelo/Competencia";

class CompetenciaService{
    private api: CompetenciaApi;

  constructor() {
    this.api = new CompetenciaApi();
  }

  async adicionarCompetencia(nome: string): Promise<Competencia> {
    const response = await this.api.criarCompetencia(nome);
      return response.data;
  }

  async atualizarCompetencia(id: number, nome: string): Promise<boolean>{
    try{
        const response = await this.api.atualizarCompetencia(id, nome)
        return true;
    } catch {
        return false;
    }
  }

  async obterCompetenciaPorId(idCompetencia: number): Promise<Competencia | undefined> {
    try {
          const response = await this.api.buscarCompetenciaPorId(idCompetencia);
          return response.data;
      } catch {
          return undefined;
      }
  }

  async listarCompetencias(): Promise<Competencia[]> {
    const response = await this.api.listarCompetencias();
      return response.data;
  }

  async removerCompetencia(idCompetencia: number): Promise<boolean> {
    try {
          await this.api.excluirCompetencia(idCompetencia);
          return true;
      } catch {
          return false;
      }
  }
}
export default CompetenciaService