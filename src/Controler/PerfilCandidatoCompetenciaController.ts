import CandidatoService from "../service/CandidatoService";
import CompetenciaService from "../service/CompetenciaService";
import UsuarioService from "../service/usuarioService";

class PerfilCandidatoCompetenciaController{
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;
    private competenciaService: CompetenciaService

    constructor() {
        this.candidatoService = new CandidatoService();
        this.usuarioService = new UsuarioService();
        this.competenciaService = new CompetenciaService();
    }


    exibirCompetenciasDoCandidato() {
        const candidatoLogado = this.usuarioService.obterCandidatoLogado();

        if (candidatoLogado) {
            const competencias = candidatoLogado.competencias;
            
            const competenciasList = document.getElementById('competencias-list');
    
            if (competenciasList) {
                competenciasList.innerHTML = '';
    
                for (const competencia of competencias) {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${competencia.getIdCompetencia()}</td>
                        <td>${competencia.getNivel()}</td>
                        <td>
                            <button class="editar-button">Editar</button>
                            <button class="excluir-button">Excluir</button>
                        </td>
                    `;
                    competenciasList.appendChild(row);
                }
            }
        } else {
            console.error('Candidato logado não encontrado.');
        }
    }
    
    obterNomeCompetenciaPorId(idCompetencia: string): string {
         const competencias = this.competenciaService.listarCompetencias();
         const competenciaEncontrada = competencias.find(competencia => competencia.obterId() === idCompetencia);
 
         if (competenciaEncontrada) {
             return competenciaEncontrada.obterNome();
         }
          return '';
    }
}
export default PerfilCandidatoCompetenciaController