import VagaCompetenciaController from "../../Controler/Empresa/VagaCompetenciaController";
import VagaCompetencia from "../../modelo/VagaCompetencia";

class VagaCompetenciaView {
    private controller: VagaCompetenciaController;
    private CompetenciaEmEdicaoIndex!: string;
    private idVaga!: number;

    constructor(controller: VagaCompetenciaController) {
        this.controller = controller;
        this.configurarEventListeners();
        console.log("chegou aqui ")
    }

    private configurarEventListeners() {
        const adicionarVagaButton = document.getElementById('adicionar-competencia-vaga') as HTMLButtonElement;
        if (adicionarVagaButton) {
            adicionarVagaButton.addEventListener('click', () => {
                 this.adicionarCompetencia();
            });
        }

        const atualizarButton = document.getElementById('atualizar-competencia-vaga');
        if (atualizarButton) {
            atualizarButton.addEventListener('click', () => {
                 this.atualizarCompetencia();
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            const competenciasButtons = document.querySelectorAll('.competencias-button');

            if (competenciasButtons) {
                competenciasButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const vagaId = button.getAttribute('data-competencia-id');
                        if (vagaId !== null) {
                            this.idVaga = parseInt(vagaId);
                            const competenciasVagaContainer = document.getElementById(`competencias-vaga-container`);
                                this.exibirCompetenciasDaVaga(this.idVaga)
                            if (competenciasVagaContainer && this.idVaga) {
                                if (competenciasVagaContainer.style.display === 'none' || competenciasVagaContainer.style.display === '') {
                                    competenciasVagaContainer.style.display = 'block';
                                } else {
                                    competenciasVagaContainer.style.display = 'none';
                                }
                            }
                        }
                    });
                });
            }
        });
    }

    pegarIdVaga(){
        
    }


    pegarValoresDoFormulario() {
        const elements = {
            name: document.getElementById('idCompetenciaVaga') as HTMLInputElement,
            nivel: document.getElementById('nivelCompetencia') as HTMLInputElement
        };


        const competencia = new VagaCompetencia(
            this.idVaga,
            elements.name.value.trim(),
            parseInt(elements.nivel.value.trim())
        )

        return competencia;
    }

    limparCamposDoFormulario() {
        const nome = document.getElementById('idCompetenciaVaga') as HTMLInputElement;
        const nivel = document.getElementById('nivelCompetencia') as HTMLInputElement;

        nome.value = "";
        nivel.value = "";
    }


    adicionarCompetencia() {
        const competencia = this.pegarValoresDoFormulario();
        this.controller.adicionarCompetencia(competencia);

        this.limparCamposDoFormulario();
        this.exibirCompetenciasDaVaga(this.idVaga);

    }

    atualizarCompetencia() {
        const competenciaHtml = this.pegarValoresDoFormulario();
        if (this.idVaga != null) {
            const competenciaEditada = this.controller.buscarCompetenciaPorId(this.idVaga, this.CompetenciaEmEdicaoIndex);

            if (competenciaEditada) {
                competenciaEditada.idCompetencia = competenciaHtml.idCompetencia
                competenciaEditada.nivel = competenciaHtml.nivel

                this.controller.atualizarCompetencia(competenciaEditada);
                this.limparCamposDoFormulario()
                this.exibirCompetenciasDaVaga(this.idVaga);
                this.idVaga = 0;
            }
        }
    }


    preencherCamposDeEdicao(competenciaIndex: number, idCompetencia: string) {
        const competenciasList = document.getElementById('competencias-vaga-list');

        if (competenciaIndex >= 0 && competenciasList) {
            const rows = competenciasList.getElementsByTagName('tr');
            if (competenciaIndex < rows.length) {
                const row = rows[competenciaIndex];
                const nome = row.cells[0].textContent;
                const nivel = row.cells[1].textContent;

                const nomeElement = document.getElementById('idCompetenciaVaga') as HTMLInputElement;
                const nivelElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;

                nomeElement.value = nome!;

                const nivelOption = nivelElement.querySelector(`option[value="${nivel}"]`) as HTMLSelectElement;
                nivelElement.value = nivelOption.value;
                this.CompetenciaEmEdicaoIndex = idCompetencia;
            }
        }
    }

    exibirCompetenciasDaVaga(idVaga: number) {
        const competencias = this.controller.listarCompetencias(idVaga);
        const competenciasList = document.getElementById('competencias-vaga-list');

        if (competenciasList) {
            competenciasList.innerHTML = '';

            for (let index = 0; index < competencias.length; index++) {
                const competencia = competencias[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                    <td>${competencia.idCompetencia}</td>
                    <td>${competencia.nivel}</td>
                    <td>
                        <button type="button" class="editar-competencia-button">Editar</button>
                        <button type="button" class="excluir-competencia-button">Excluir</button>
                    </td>
                    `;

                competenciasList.appendChild(row);

                const editarButton = row.querySelector('.editar-competencia-button');
                if (editarButton) {
                    editarButton.addEventListener('click', (event) => {
                        const rowIndex = Array.from(competenciasList.children).indexOf(row);
                        const idCompetencia = competencia.id
                        this.preencherCamposDeEdicao(rowIndex, idCompetencia);
                    });
                }

                const excluirButton = row.querySelector('.excluir-competencia-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const idCompetencia = competencia.id
                        this.controller.excluirCompetencia(idVaga, idCompetencia)
                        this.exibirCompetenciasDaVaga(idVaga);
                    });
                }
            }
        }
    }

    nivelMap: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3
    };
}
export default VagaCompetenciaView;