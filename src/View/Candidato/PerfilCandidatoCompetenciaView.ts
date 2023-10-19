import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/PerfilCandidatoCompetenciaController";
import CandidatoCompetencia from "../../modelo/CandidatoCompetencia";
import UsuarioService from "../../service/UsuarioService";

class PerfilCandidatoCompetenciaView {
    private controller: PerfilCandidatoCompetenciaController;
    private competenciaEmEdicaoIndex: number | null = null;
    usuarioService: UsuarioService;

    constructor(controller: PerfilCandidatoCompetenciaController, usuarioService: UsuarioService) {
        this.controller = controller;
        this.usuarioService = usuarioService;

        const adicionarCompetenciaButton = document.getElementById('adicionar-competencia') as HTMLButtonElement;
        if (adicionarCompetenciaButton) {
            adicionarCompetenciaButton.addEventListener('click', () => {
                this.adicionarCompetencia();
            });
        }

        const salvarButton = document.getElementById('salvar-competencia-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.EdidarCompetencia();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            name: document.getElementById('nomeCompetencia') as HTMLInputElement,
            nivel: document.getElementById('nivelCompetencia') as HTMLInputElement
        };
    
        const competencia = {
            name: elements.name.value.trim(),
            nivel: elements.nivel.value.trim()
        };
    
        return competencia;
    }

    limparCamposDoFormulário() {
        const nome =  document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivel = document.getElementById('nivelCompetencia') as HTMLInputElement;
      
        nome.value = "";
        nivel.value = "";
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
            const competencias = this.controller.listarCompetencia();
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

                            this.controller.excluirCompetencia(competenciaId);

                            this.exibirCompetenciasDoCandidato();
                        });
                    }
                }
            }
    }


    adicionarCompetencia() {
        const nomeCompetenciaElement = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivelCompetenciaElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;
        const nomeCompetencia = nomeCompetenciaElement.value;
        const nivelCompetenciaString = nivelCompetenciaElement.value;

        if (nomeCompetencia && nivelCompetenciaString) {
            const nivelCompetencia = this.nivelMap[nivelCompetenciaString];
            const idCandidato = this.usuarioService.obterIdUsuarioLogado();

            const novaCompetencia = new CandidatoCompetencia(
                idCandidato,
                nomeCompetencia,
                nivelCompetencia
            );

            this.controller.adicionarCompetencias( novaCompetencia);

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
    
        const novoNomeCompetencia = nomeCompetenciaElement.value;
        const novoNivelCompetenciaString = nivelCompetenciaElement.value;

    
        if (novoNomeCompetencia && novoNivelCompetenciaString) {
            const novoNivelCompetencia = parseInt(novoNivelCompetenciaString, 10);
            const idCandidato = this.usuarioService.obterIdUsuarioLogado();
            const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);
    
            if (candidatoLogado) {
                if (this.competenciaEmEdicaoIndex != null) {
                    const competenciaEditada = candidatoLogado.competencias[this.competenciaEmEdicaoIndex];
                    competenciaEditada.idCompetencia = novoNomeCompetencia
                    competenciaEditada.nivel = novoNivelCompetencia

                    this.controller.atualizarCompetencia(competenciaEditada);
    
                    nomeCompetenciaElement.value = '';
                    nivelCompetenciaElement.value = '';
    
                    this.competenciaEmEdicaoIndex = null;
                    this.exibirCompetenciasDoCandidato();
                }
    
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
export default PerfilCandidatoCompetenciaView;