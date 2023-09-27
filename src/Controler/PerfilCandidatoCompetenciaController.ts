import CandidatoCompetencia from "../modelo/CandidatoCompetencia";
import CandidatoService from "../service/CandidatoService";
import CompetenciaService from "../service/CompetenciaService";
import UsuarioService from "../service/usuarioService";

class PerfilCandidatoCompetenciaController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;
    private competenciaService: CompetenciaService

    constructor() {
        this.candidatoService = new CandidatoService();
        this.usuarioService = new UsuarioService();
        this.competenciaService = new CompetenciaService();

        const adicionarCompetenciaButton = document.getElementById('adicionar-competencia');
        if (adicionarCompetenciaButton) {
            adicionarCompetenciaButton.addEventListener('click', () => {
                this.adicionarCompetencia();
            });
        }

        const editarButtons = document.querySelectorAll('.editar-button');
        editarButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                this.preencherCamposDeEdicao(index);
            });
        });
    }

    preencherCamposDeEdicao(competenciaIndex: number) {
        const competenciasList = document.getElementById('competencias-list');

        if (competenciaIndex >= 0 && competenciasList) {
            const rows = competenciasList.getElementsByTagName('tr');
            if (competenciaIndex < rows.length) {
                const row = rows[competenciaIndex];
                const idCompetencia = row.cells[0].textContent; 
                const nivel = row.cells[1].textContent; 
    
                const nomeCompetenciaElement = document.getElementById('nomeCompetencia') as HTMLInputElement ;
                const nivelCompetenciaElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;
    
                nomeCompetenciaElement.value = idCompetencia!;
                nivelCompetenciaElement.value = nivel!;
            }
        }
    }
    

    exibirCompetenciasDoCandidato() {
        const candidatoLogado = this.usuarioService.obterCandidatoLogado();

        if (candidatoLogado) {
            const idCandidato = candidatoLogado.id;
            const competencias = this.candidatoService.obterCompetenciasDoCandidato(idCandidato);
            const competenciasList = document.getElementById('competencias-list');

            if (competenciasList) {
                competenciasList.innerHTML = '';

                for (const competencia of competencias) {
                    const row = document.createElement('tr');
                    row.innerHTML =
                    `
                    <td>${competencia.idCompetencia}</td>
                    <td>${competencia.nivel}</td>
                    <td style="display: none;" data-competencia-id="${competencia.idCompetencia}"></td>
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

    adicionarCompetencia() {
        const nomeCompetenciaElement = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivelCompetenciaElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;
        const nomeCompetencia = nomeCompetenciaElement.value;
        const nivelCompetenciaString = nivelCompetenciaElement.value;

        if (nomeCompetencia && nivelCompetenciaString) {
            const nivelCompetencia = this.nivelMap[nivelCompetenciaString];
            const usuarioLogado = this.usuarioService.obterCandidatoLogado()
            const idCandidato = usuarioLogado.id

            const novaCompetencia = new CandidatoCompetencia(
                idCandidato,
                nomeCompetencia,
                nivelCompetencia
            );

            usuarioLogado.competencias.push(novaCompetencia);

            this.candidatoService.adicionarCompetenciaAoCandidato(idCandidato, novaCompetencia);
            this.usuarioService.setUsuarioLogado(usuarioLogado);

            nomeCompetenciaElement.value = '';
            nivelCompetenciaElement.value = 'Basico';

            this.exibirCompetenciasDoCandidato();
        } else {
            console.error('Nome e nível da competência são obrigatórios.');
        }
    }

    
    
    nivelMap: { [key: string]: number } = {
        "Basico": 1,
        "Intermediario": 2,
        "Avancado": 3
    };
}
export default PerfilCandidatoCompetenciaController