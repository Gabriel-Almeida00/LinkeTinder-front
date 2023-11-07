import PerfilEmpresaVagasController from "../../Controler/Empresa/PerfilEmpresaVagasController";
import Vaga from "../../modelo/Vaga";

class VagaView {
    private vagaEmEdicaoIndex: number | null = null;
    private controller: PerfilEmpresaVagasController

    constructor() {
        this.controller = new PerfilEmpresaVagasController()
        this.configurarEventListeners()
    }

    configurarEventListeners() {
        const adicionarVagaButton = document.getElementById('cadastro-vaga-button') as HTMLButtonElement;
        if (adicionarVagaButton) {
            adicionarVagaButton.addEventListener('click', () => {
                this.adicionarVaga();
            });
        }

        const atualizarButton = document.getElementById('atualizar-vaga-button');
        if (atualizarButton) {
            atualizarButton.addEventListener('click', () => {
                this.atualizarVaga();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            nome: document.getElementById('nomeVaga') as HTMLInputElement,
            descricao: document.getElementById('descricaoVaga') as HTMLSelectElement,
            cidade: document.getElementById('cidadeVaga') as HTMLSelectElement,
            nivelFormacao: document.getElementById('nivelFormacao') as HTMLSelectElement,
            nivelExperiencia: document.getElementById('nivelExperiencia') as HTMLSelectElement
        };

        const vaga = new Vaga(
            1,
            elements.nome.value,
            elements.descricao.value,
            elements.cidade.value,
            parseInt(elements.nivelExperiencia.value),
            parseInt(elements.nivelExperiencia.value)
        )

        return vaga;
    }


    limparCamposDoFormulario() {
        const nomeElement = document.getElementById('nomeVaga') as HTMLInputElement;
        const descricaoElement = document.getElementById('descricaoVaga') as HTMLSelectElement;
        const cidadeElement = document.getElementById('cidadeVaga') as HTMLSelectElement;
        const nivelFormacaoElement = document.getElementById('nivelFormacao') as HTMLSelectElement;
        const nivelExperienciaElement = document.getElementById('nivelExperiencia') as HTMLSelectElement;

        nomeElement.value = "";
        descricaoElement.value = "";
        cidadeElement.value = "";
        nivelFormacaoElement.value = "1";
        nivelExperienciaElement.value = "1"
    }

    adicionarVaga() {
        const vaga = this.pegarValoresDoFormulario()
        this.controller.adicionarVaga(vaga)

        this.limparCamposDoFormulario()
        this.exibirVagasDaEmpresa()
    }

    async atualizarVaga() {
        const vagaAtualizada = this.pegarValoresDoFormulario()

        if (this.vagaEmEdicaoIndex != null) {
            const vagaEditada = await this.controller.buscarVagaDaEmpresaPorId(this.vagaEmEdicaoIndex)

            if (vagaEditada) {
                vagaEditada.nome = vagaAtualizada.nome
                vagaEditada.cidade = vagaAtualizada.cidade
                vagaEditada.descricao = vagaAtualizada.descricao
                vagaEditada.experienciaMinima = vagaAtualizada.experienciaMinima
                vagaEditada.formacaoMinima = vagaAtualizada.formacaoMinima

                this.controller.atualizarVaga(vagaEditada)
                this.limparCamposDoFormulario()
                this.exibirVagasDaEmpresa()
                this.vagaEmEdicaoIndex = null;
            }
        }
    }

    async preencherCamposDeEdicao(id: number) {
        const vaga = await this.controller.buscarVagaDaEmpresaPorId(id)
        const vagaForm = document.getElementById('form-vaga')

        if (vaga && vagaForm) {
            const nomeElement = vagaForm.querySelector('#nomeVaga') as HTMLInputElement;
            const descricaoElement = vagaForm.querySelector('#descricaoVaga') as HTMLSelectElement;
            const cidadeElement = vagaForm.querySelector('#cidadeVaga') as HTMLSelectElement;
            const nivelFormacaoElement = vagaForm.querySelector('#nivelFormacao') as HTMLSelectElement;
            const nivelExperienciaElement = vagaForm.querySelector('#nivelExperiencia') as HTMLSelectElement;

            if(nomeElement && descricaoElement && cidadeElement && nivelExperienciaElement && nivelFormacaoElement){
                nomeElement.value = vaga.nome
                descricaoElement.value = vaga.descricao
                cidadeElement.value = vaga.cidade

                const nivelExperienciaOption = nivelExperienciaElement
                    .querySelector(`option[value="${vaga.experienciaMinima}"]`) as HTMLSelectElement;
                const nivelFormacaoOption = nivelFormacaoElement
                    .querySelector(`option[value="${vaga.formacaoMinima}"]`) as HTMLSelectElement;
               
                nivelExperienciaElement.value = nivelExperienciaOption.value;
                nivelFormacaoElement.value = nivelFormacaoOption.value

                this.vagaEmEdicaoIndex = vaga.id
            }
        }
    }



    async exibirVagasDaEmpresa() {
        const vagas = await this.controller.buscarVagasDaEmpresa();
        const vagasList = document.getElementById('vagas-list');

        if (vagasList) {
            vagasList.innerHTML = ''

            for (let index = 0; index < vagas.length; index++) {
                const vaga = vagas[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                    <td>${vaga.nome}</td>
                    <td>${vaga.descricao}</td>
                    <td>${vaga.cidade}</td>
                    <td>${vaga.formacaoMinima}</td>
                    <td>${vaga.experienciaMinima}</td>
                    <td>
                        <button type="button" class="editar-button">Editar</button>
                        <button type="button" class="excluir-button">Excluir</button>
                    </td>
                    <td>
                        <button type="button" class="competencias-button" data-competencia-id="${vaga.id}">
                            Competências</button>
                    </td>
                    `;

                vagasList.appendChild(row);

                const editarButton = row.querySelector('.editar-button');
                if (editarButton) {
                    editarButton.addEventListener('click', () => {
                        const id = vaga.id
                        this.preencherCamposDeEdicao(id);
                    });
                }

                const excluirButton = row.querySelector('.excluir-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const idVaga = vaga.id;

                        this.controller.excluirVaga(idVaga);

                        this.exibirVagasDaEmpresa();
                    });
                }
            }
        }

    }
}
export default VagaView;