import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/CandidatoCompetenciaController";


class PerfilCandidatoCompetenciaView {
    private controller: PerfilCandidatoCompetenciaController;
    private competenciaEmEdicaoIndex: string | null = null;

    constructor(controller: PerfilCandidatoCompetenciaController) {
        this.controller = controller;
        this.configurarEventListeners();
    }

    private configurarEventListeners() {
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
            nivel: parseInt(elements.nivel.value.trim())
        };

        return competencia;
    }

    limparCamposDoFormulario() {
        const nome = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivel = document.getElementById('nivelCompetencia') as HTMLInputElement;

        nome.value = "";
        nivel.value = "";
    }



    preencherCamposDeEdicao(competenciaId: string) {
        const competencia = this.controller.buscarCompetenciaPorId(competenciaId);
        const competenciaForm = document.getElementById('perfil-form');

        if (competenciaForm && competencia) {
            const nomeCompetenciaInput = competenciaForm.querySelector("#nomeCompetencia") as HTMLInputElement;
            const nivelCompetenciaSelect = competenciaForm.querySelector("#nivelCompetencia") as HTMLSelectElement;

            if (nomeCompetenciaInput && nivelCompetenciaSelect) {
                nomeCompetenciaInput.value = competencia.idCompetencia;
                const nivelOption = nivelCompetenciaSelect.querySelector(`option[value="${competencia.nivel}"]`) as HTMLSelectElement;
                nivelCompetenciaSelect.value = nivelOption.value;

                this.competenciaEmEdicaoIndex = competenciaId
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
                    editarButton.addEventListener('click', () => {
                        const competenciaId = competencia.id;
                        this.preencherCamposDeEdicao(competenciaId);
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
        const competencia = this.pegarValoresDoFormulario();
        this.controller.adicionarCompetencias(competencia.name, competencia.nivel);

        this.limparCamposDoFormulario();
        this.exibirCompetenciasDoCandidato();

    }

    EdidarCompetencia() {
        const competenciaHtml = this.pegarValoresDoFormulario();

        if (this.competenciaEmEdicaoIndex != null) {
            const competenciaEditada = this.controller.buscarCompetenciaPorId(this.competenciaEmEdicaoIndex);

            if (competenciaEditada) {
                competenciaEditada.idCompetencia = competenciaHtml.name
                competenciaEditada.nivel = competenciaHtml.nivel

                this.controller.atualizarCompetencia(competenciaEditada);
                this.limparCamposDoFormulario()
                this.exibirCompetenciasDoCandidato();
                this.competenciaEmEdicaoIndex = null;
            }
        }
    }
}
export default PerfilCandidatoCompetenciaView;