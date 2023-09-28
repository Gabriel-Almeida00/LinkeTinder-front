import CandidatoCompetencia from "../modelo/CandidatoCompetencia";
import CandidatoService from "../service/CandidatoService";
import CompetenciaService from "../service/CompetenciaService";
import UsuarioService from "../service/usuarioService";

class PerfilCandidatoCompetenciaController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;
    private competenciaService: CompetenciaService
    private competenciaEmEdicaoIndex: number | null = null;

    constructor() {
        this.candidatoService = new CandidatoService();
        this.usuarioService = new UsuarioService();
        this.competenciaService = new CompetenciaService();

        const adicionarCompetenciaButton = document.getElementById('adicionar-competencia') as HTMLButtonElement;
        if (adicionarCompetenciaButton) {
            adicionarCompetenciaButton.addEventListener('click', () => {
                this.adicionarCompetencia();
            });
        }

        const salvarButton = document.getElementById('salvar-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.EdidarCompetencia();
            });
        }
    }

    preencherCamposDeEdicao(competenciaIndex: number) {
        const competenciasList = document.getElementById('competencias-list');

        if (competenciaIndex >= 0 && competenciasList) {
            const rows = competenciasList.getElementsByTagName('tr');
            if (competenciaIndex < rows.length) {
                const row = rows[competenciaIndex];
                const idCompetencia = row.cells[0].textContent;
                const nivel = row.cells[1].textContent;

                const nomeCompetenciaElement = document.getElementById('nomeCompetencia') as HTMLInputElement;
                const nivelCompetenciaElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;

                nomeCompetenciaElement.value = idCompetencia!;

                const nivelOption = nivelCompetenciaElement.querySelector(`option[value="${nivel}"]`) as HTMLSelectElement;
                if (nivelOption) {
                    nivelCompetenciaElement.value = nivelOption.value;
                } else {
                    console.error(`Valor de nível inválido: ${nivel}`);
                }

                this.competenciaEmEdicaoIndex = competenciaIndex;
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

                for (let index = 0; index < competencias.length; index++) {
                    const competencia = competencias[index];
                    const row = document.createElement('tr');
                    row.innerHTML =
                        `
                <td>${competencia.idCompetencia}</td>
                <td>${competencia.nivel}</td>
                <td style="display: none;" data-competencia-id="${competencia.idCompetencia}"></td>
                <td>
                    <button type="button" class="editar-button">Editar</button>
                    <button type="button" class="excluir-button">Excluir</button>
                </td>
                `;

                    competenciasList.appendChild(row);

                    const editarButton = row.querySelector('.editar-button');
                    if (editarButton) {
                        editarButton.addEventListener('click', (event) => {
                            const rowIndex = Array.from(competenciasList.children).indexOf(row);
                            this.preencherCamposDeEdicao(rowIndex);
                        });
                    }

                    const excluirButton = row.querySelector('.excluir-button');
                    if (excluirButton) {
                        excluirButton.addEventListener('click', () => {
                            const competenciaId = competencia.idCompetencia;
    
                            this.candidatoService.excluirCompetenciaDoCandidato(idCandidato, competenciaId);
    
                            this.exibirCompetenciasDoCandidato();
                        });
                    }
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

    EdidarCompetencia() {
        const nomeCompetenciaElement = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivelCompetenciaElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;

        const nomeCompetencia = nomeCompetenciaElement.value;
        const nivelCompetenciaString = nivelCompetenciaElement.value;

        if (nomeCompetencia && nivelCompetenciaString) {
            const nivelCompetencia = parseInt(nivelCompetenciaString, 10);

            const candidatoLogado = this.usuarioService.obterCandidatoLogado();
            if (candidatoLogado) {
                const novasCompetencias = candidatoLogado.competencias.slice();
                novasCompetencias.push(new CandidatoCompetencia(candidatoLogado.id, nomeCompetencia, nivelCompetencia));

                this.candidatoService.atualizarCompetenciasDoCandidato(candidatoLogado.id, novasCompetencias);

                nomeCompetenciaElement.value = '';
                nivelCompetenciaElement.value = '1';

                this.exibirCompetenciasDoCandidato();
            } else {
                console.error('Candidato logado não encontrado.');
            }
        } else {
            console.error('Nome e nível da competência são obrigatórios.');
        }
    }



    nivelMap: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3
    };
}
export default PerfilCandidatoCompetenciaController