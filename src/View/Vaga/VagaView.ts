import PerfilEmpresaVagasController from "../../Controler/Empresa/PerfilEmpresaVagasController";
import VagaCompetenciaController from "../../Controler/Empresa/VagaCompetenciaController";
import Vaga from "../../modelo/Vaga";
import VagaCompetencia from "../../modelo/VagaCompetencia";
import CompetenciaService from "../../service/competencias/CompetenciaService";

class VagaView {
    private idVaga!: number;
    private vagaEmEdicaoIndex: number | null = null;
    private CompetenciaEmEdicaoIndex!: number;
    private competenciaService: CompetenciaService;

    private controller: PerfilEmpresaVagasController
    private controllerVaga: VagaCompetenciaController

    constructor(controllerVaga: VagaCompetenciaController) {
        this.controllerVaga = controllerVaga
        this.controller = new PerfilEmpresaVagasController()
        this.competenciaService = new CompetenciaService()
        this.configurarEventListeners()
        this.configurarEventListenersVaga()
        this.listarCompetenciasNoSelect()
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

    private configurarEventListenersVaga() {
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
    }

    async listarCompetenciasNoSelect(){
        const competencias = await this.competenciaService.listarCompetencias();
        const selectElement = document.getElementById('competencias');

        if(selectElement){
            selectElement.innerHTML = '';

            competencias.forEach((competencia) => {
                const option = document.createElement('option');
                option.value = competencia.id; 
                option.text = competencia.nome; 
                selectElement.appendChild(option);
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

            if (nomeElement && descricaoElement && cidadeElement && nivelExperienciaElement && nivelFormacaoElement) {
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
                        <button type="button" class="vaga-competencia-button" data-competencia-id="${vaga.id}">
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


                const mostrarCompetencias = row.querySelector('.vaga-competencia-button');
                if (mostrarCompetencias) {
                    mostrarCompetencias.addEventListener('click', () => {
                        const vagaId = mostrarCompetencias.getAttribute('data-competencia-id');
                        if (vagaId !== null) {
                            this.idVaga = parseInt(vagaId);
                            const competenciasVagaContainer = document.getElementById(`competencias-vaga-container`);
                            if (competenciasVagaContainer) {
                                if (competenciasVagaContainer.style.display === 'none' || competenciasVagaContainer.style.display === '') {
                                    competenciasVagaContainer.style.display = 'block';
                                } else {
                                    competenciasVagaContainer.style.display = 'none';
                                }
                                this.exibirCompetenciasDaVaga(this.idVaga);
                            }
                        }
                    });
                }
            }
        }

    }

    async exibirCompetenciasDaVaga(idVaga: number) {
        const competencias = await this.controllerVaga.listarCompetencias(idVaga);
        const competenciasList = document.getElementById('competencias-vaga-list');

        if (competenciasList) {
            competenciasList.innerHTML = '';

            for (let index = 0; index < competencias.length; index++) {
                const competencia = competencias[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                    <td>${competencia.nome}</td>
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
                        this.preencherCamposDeEdicaoVaga(idCompetencia);
                    });
                }

                const excluirButton = row.querySelector('.excluir-competencia-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const idCompetencia = competencia.id
                        this.controllerVaga.excluirCompetencia(idCompetencia)
                        this.exibirCompetenciasDaVaga(idVaga);
                    });
                }
            }
        }
    }

    async preencherCamposDeEdicaoVaga( idCompetencia: number) {
        const competencia = await this.controllerVaga.buscarCompetenciaPorId(idCompetencia)
        const competenciaForm = document.getElementById('form-vaga-competencia');

        if(competencia && competenciaForm){
            const nomeCompetenciaInput = competenciaForm.querySelector("#competencias") as HTMLSelectElement;
            const nivelCompetenciaSelect = competenciaForm.querySelector("#nivelCompetencia") as HTMLSelectElement;

            if (nomeCompetenciaInput && nivelCompetenciaSelect) {
                const nomeOptions = nomeCompetenciaInput.querySelector(`option[value="${competencia.idCompetencia}"]`) as HTMLSelectElement;
                const nivelOption = nivelCompetenciaSelect.querySelector(`option[value="${competencia.nivel}"]`) as HTMLSelectElement;

                nivelCompetenciaSelect.value = nivelOption.value;
                nomeCompetenciaInput.value = nomeOptions.value;

                this.CompetenciaEmEdicaoIndex = competencia.id
            }
        }
    }

    pegarValoresDoFormularioVaga() {
        const elements = {
            name: document.getElementById('competencias') as HTMLInputElement,
            nivel: document.getElementById('nivelCompetencia') as HTMLInputElement
        };


        const competencia = new VagaCompetencia(
            this.idVaga,
            parseInt(elements.name.value.trim()),
            parseInt(elements.nivel.value.trim())
        )

        return competencia;
    }


    async atualizarCompetencia() {
        const competenciaHtml = this.pegarValoresDoFormularioVaga();
        if (this.idVaga != null) {
            const competenciaEditada = await this.controllerVaga.buscarCompetenciaPorId( this.CompetenciaEmEdicaoIndex);

            if (competenciaEditada) {
                competenciaEditada.idCompetencia = competenciaHtml.idCompetencia
                competenciaEditada.nivel = competenciaHtml.nivel

                this.controllerVaga.atualizarCompetencia(competenciaEditada);
                this.limparCamposDoFormulario()
                this.exibirCompetenciasDaVaga(this.idVaga);
                this.idVaga = 0;
            }
        }
    }

    limparCamposDoFormularioVaga() {
        const nome = document.getElementById('competencias') as HTMLInputElement;
        const nivel = document.getElementById('nivelCompetencia') as HTMLInputElement;

        nome.value = "";
        nivel.value = "";
    }

    adicionarCompetencia() {
        const competencia = this.pegarValoresDoFormularioVaga();
        competencia.idVaga = this.idVaga
        this.controllerVaga.adicionarCompetencia(competencia);

        this.limparCamposDoFormularioVaga();
        this.exibirCompetenciasDaVaga(this.idVaga);

    }
}
export default VagaView;