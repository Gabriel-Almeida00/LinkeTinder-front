import PerfilCandidatoExperienciaController from "../../Controler/Candidato/CandidatoExperienciaController";
import Experiencia from "../../modelo/Experiencia";

class CandidatoExperienciaView {
    private controller: PerfilCandidatoExperienciaController;
    private experienciaEmEdicaoIndex: number | null = null;

    constructor(controller: PerfilCandidatoExperienciaController) {
        this.controller = controller;
        this.configurarEventListeners();
    }

    private configurarEventListeners() {
        const adicionarExperienciaButton = document.getElementById('adicionar-experiencia');
        if (adicionarExperienciaButton) {
            adicionarExperienciaButton.addEventListener('click', () => {
                this.adicionarExperiencia();
            });
        }

        const salvarButton = document.getElementById('atualizar-experiencia-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.editarExperiencia();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            cargo: document.getElementById('cargoExperiencia') as HTMLInputElement,
            empresa: document.getElementById('empresaExperiencia') as HTMLInputElement,
            nivel: document.getElementById('nivelExperiencia') as HTMLInputElement
        };

        const experiencia = new Experiencia(
            1,
            elements.cargo.value.trim(),
            elements.empresa.value,
            parseInt(elements.nivel.value.trim())
        )

        return experiencia;
    }

    limparCamposDoFormulario() {
        const cargoElement = document.getElementById('cargoExperiencia') as HTMLInputElement;
        const empresaElement = document.getElementById('empresaExperiencia') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelExperiencia') as HTMLInputElement;


        cargoElement.value = "";
        empresaElement.value = "";
        nivelElement.value = "";
    }

    async preencherCamposDeEdicaoExperiencia(experienciaId: number) {
        const experiencia = await this.controller.obterExperienciaPorId(experienciaId);
        const experienciaForm = document.getElementById('perfil-form');

        if (experiencia && experienciaForm) {
            const cargoElement = experienciaForm.querySelector("#cargoExperiencia") as HTMLInputElement;
            const empresaElement = experienciaForm.querySelector("#empresaExperiencia") as HTMLSelectElement;
            const nivelSelect = experienciaForm.querySelector("#nivelExperiencia") as HTMLInputElement;

            if (cargoElement && empresaElement && nivelSelect) {
                cargoElement.value = experiencia.cargo;
                empresaElement.value = experiencia.empresa;
                const nivelOption = nivelSelect.querySelector(`option[value="${experiencia.nivel}"]`) as HTMLSelectElement;
                nivelSelect.value = nivelOption.value;

                this.experienciaEmEdicaoIndex = experienciaId;
            }
        }
    }

    async exibirExperienciaDoCandidato() {
        const experiencias = await this.controller.listarExperiencias();
        const experienciasList = document.getElementById('experiencias-list');

        if (experienciasList) {
            experienciasList.innerHTML = '';

            for (let index = 0; index < experiencias.length; index++) {
                const experiencia = experiencias[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                <td>${experiencia.cargo}</td>
                <td>${experiencia.empresa}</td>
                <td>${experiencia.nivel}</td>
                <td>
                    <button type="button" class="editar-button">Editar</button>
                    <button type="button" class="excluir-button">Excluir</button>
                </td>
                `;

                experienciasList.appendChild(row);

                const editarButton = row.querySelector('.editar-button');
                if (editarButton) {
                    editarButton.addEventListener('click', () => {
                        const experienciaId = experiencia.id;
                        this.preencherCamposDeEdicaoExperiencia(experienciaId);
                    });
                }

                const excluirButton = row.querySelector('.excluir-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const experienciaId = experiencia.id;

                        this.controller.excluirExperiencia(experienciaId);

                        this.exibirExperienciaDoCandidato();
                    });
                }
            }
        }
    }

    adicionarExperiencia() {
        const experiencia = this.pegarValoresDoFormulario();
        this.controller.adicionarExperiencia(experiencia);

        this.limparCamposDoFormulario();
        this.exibirExperienciaDoCandidato();
    }

    async editarExperiencia() {
        const experienciaHtml = this.pegarValoresDoFormulario();

        if (this.experienciaEmEdicaoIndex != null) {
            const experienciaEditada = await this.controller.obterExperienciaPorId(this.experienciaEmEdicaoIndex);

            if (experienciaEditada) {
                experienciaEditada.cargo = experienciaHtml.cargo
                experienciaEditada.empresa = experienciaHtml.empresa
                experienciaEditada.nivel = experienciaHtml.nivel

                this.controller.atualizarExperiencia(experienciaEditada);
                this.limparCamposDoFormulario();
                this.exibirExperienciaDoCandidato();
                this.experienciaEmEdicaoIndex = null;
            }
        }
    }
}
export default CandidatoExperienciaView;