import CandidatoFormacaoController from "../../Controler/Candidato/CandidatoFormacaoController";
import Formacao from "../../modelo/Formacao";

class CandidatoFormacaoView {
    private controller: CandidatoFormacaoController
    private formacaoEmEdicaoIndex: number | null = null;

    constructor(controller: CandidatoFormacaoController) {
        this.controller = controller;
        this.configurarEventListeners();
    }

    private configurarEventListeners() {
        const adicionarFormacaoButton = document.getElementById('adicionar-formacao');
        if (adicionarFormacaoButton) {
            adicionarFormacaoButton.addEventListener('click', () => {
                this.adicionarFormacao();
            });
        }


        const salvarButton = document.getElementById('atualizar-formacao-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.editarFormacao();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            instituicao: document.getElementById('instituicaoFormacao') as HTMLInputElement,
            curso: document.getElementById('cursoFormacao') as HTMLInputElement,
            nivel: document.getElementById('nivelFormacao') as HTMLInputElement,
            anoConclusao: document.getElementById('anoConclusaoFormacao') as HTMLInputElement
        };

        const competencia = new Formacao(
            1,
            elements.instituicao.value,
            elements.curso.value,
            parseInt(elements.nivel.value),
            elements.anoConclusao.value
        )

        return competencia;
    }

    limparCamposDoFormulario() {
        const instituicaoElement = document.getElementById('instituicaoFormacao') as HTMLInputElement;
        const cursoElement = document.getElementById('cursoFormacao') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelFormacao') as HTMLInputElement;
        const anoConclusaoElement = document.getElementById('anoConclusaoFormacao') as HTMLInputElement;

        instituicaoElement.value = "";
        cursoElement.value = "";
        nivelElement.value = "";
        anoConclusaoElement.value = "";
    }


    async preencherCamposDeEdicaoFormacao(formacaoId: number) {
        const formacao = await this.controller.buscarFormacaoPorId(formacaoId);
        const formacaoForm = document.getElementById('perfil-form');

        if (formacaoForm && formacao) {
            const instituicaoInput = formacaoForm.querySelector("#instituicaoFormacao") as HTMLInputElement;
            const cursoInput = formacaoForm.querySelector("#cursoFormacao") as HTMLInputElement;
            const nivelSelect = formacaoForm.querySelector("#nivelFormacao") as HTMLSelectElement
            const anoConclusaoInput = formacaoForm.querySelector("#anoConclusaoFormacao") as HTMLInputElement;

            if (instituicaoInput && cursoInput && nivelSelect && anoConclusaoInput) {
                instituicaoInput.value = formacao.instituicao;
                cursoInput.value = formacao.curso;
                anoConclusaoInput.value = formacao.anoConclusao;

                const nivelOption = nivelSelect.querySelector(`option[value="${formacao.nivel}"]`) as HTMLSelectElement;
                nivelSelect.value = nivelOption.value;

                this.formacaoEmEdicaoIndex = formacaoId;
            }
        }
    }

    async exibirFormacoesDoCandidato() {
        const formacoes = await this.controller.listarFormacao();
        const formacoesList = document.getElementById('formacoes-list');

        if (formacoesList) {
            formacoesList.innerHTML = '';

            for (let index = 0; index < formacoes.length; index++) {
                const formacao = formacoes[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                <td>${formacao.instituicao}</td>
                <td>${formacao.curso}</td>
                <td>${formacao.nivel}</td>
                <td>${formacao.anoConclusao}</td>
                <td>
                    <button type="button" class="editar-button">Editar</button>
                    <button type="button" class="excluir-button">Excluir</button>
                </td>
                `;

                formacoesList.appendChild(row);

                const editarButton = row.querySelector('.editar-button');
                if (editarButton) {
                    editarButton.addEventListener('click', () => {
                        const formacaoId = formacao.id;
                        this.preencherCamposDeEdicaoFormacao(formacaoId);
                    });
                }

                const excluirButton = row.querySelector('.excluir-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const formacaoId = formacao.id;
                        this.controller.excluirFormacao(formacaoId);

                        this.exibirFormacoesDoCandidato();
                    });
                }
            }
        }
    }


    adicionarFormacao() {
        const formacao = this.pegarValoresDoFormulario();
        this.controller.adicionarFormacao(formacao);

        this.limparCamposDoFormulario();
        this.exibirFormacoesDoCandidato();
    }


    async editarFormacao() {
        const formacaoHtml = this.pegarValoresDoFormulario();

        if (this.formacaoEmEdicaoIndex != null) {
            const formacaoEditada = await this.controller.buscarFormacaoPorId(this.formacaoEmEdicaoIndex);
            if (formacaoEditada) {
                formacaoEditada.instituicao = formacaoHtml.instituicao
                formacaoEditada.curso = formacaoHtml.curso
                formacaoEditada.nivel = formacaoHtml.nivel
                formacaoEditada.anoConclusao = formacaoHtml.anoConclusao

                this.controller.atualizarFormacao(formacaoEditada);
                this.limparCamposDoFormulario()
                this.exibirFormacoesDoCandidato();
                this.formacaoEmEdicaoIndex = null;
            }
        }
    }
}
export default CandidatoFormacaoView;