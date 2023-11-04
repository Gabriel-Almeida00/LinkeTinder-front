import PerfilCandidatoCompetenciaController from "../../Controler/Candidato/CandidatoCompetenciaController";
import CompetenciaDTO from "../../modelo/dto/CompetenciaDTO";
import CompetenciaService from "../../service/CompetenciaService";


class PerfilCandidatoCompetenciaView {
    private controller: PerfilCandidatoCompetenciaController;
    private competenciaService: CompetenciaService;
    private competenciaEmEdicaoIndex: number | null = null;

    constructor(controller: PerfilCandidatoCompetenciaController) {
        this.controller = controller;
        this.competenciaService = new CompetenciaService();
        this.configurarEventListeners();
        this.listarCompetenciasNoSelect();
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
            name: document.getElementById('competencias') as HTMLInputElement,
            nivel: document.getElementById('nivelCompetencia') as HTMLInputElement
        };

        const competencia = new CompetenciaDTO(
           parseInt(elements.name.value.trim()),
            parseInt(elements.nivel.value.trim())
        )
            
        
        return competencia;
    }

    limparCamposDoFormulario() {
        const nome = document.getElementById('competencias') as HTMLInputElement;
        const nivel = document.getElementById('nivelCompetencia') as HTMLInputElement;

        nome.value = "";
        nivel.value = "";
    }



    async preencherCamposDeEdicao(competenciaId: number) {
        const competencia = await this.controller.buscarCompetenciaPorId(competenciaId);
        const competenciaForm = document.getElementById('perfil-form');

        if (competenciaForm && competencia) {
            const nomeCompetenciaInput = competenciaForm.querySelector("#competencias") as HTMLSelectElement;
            const nivelCompetenciaSelect = competenciaForm.querySelector("#nivelCompetencia") as HTMLSelectElement;

            if (nomeCompetenciaInput && nivelCompetenciaSelect) {
                const nomeOptions = nomeCompetenciaInput.querySelector(`option[value="${competencia.idCompetencia}"]`) as HTMLSelectElement;
                const nivelOption = nivelCompetenciaSelect.querySelector(`option[value="${competencia.idNivelCompetencia}"]`) as HTMLSelectElement;

                nivelCompetenciaSelect.value = nivelOption.value;
                nomeCompetenciaInput.value = nomeOptions.value;

                this.competenciaEmEdicaoIndex = competenciaId
            }
        }
    }



    async exibirCompetenciasDoCandidato() {
        const competencias = await this.controller.listarCompetencia();
        const competenciasList = document.getElementById('competencias-list');

        if (competenciasList) {
            competenciasList.innerHTML = '';

            for (let index = 0; index < competencias.length; index++) {
                const competencia = competencias[index];
                const row = document.createElement('tr');
                row.innerHTML =
                    `
                <td>${competencia.nome}</td>
                <td>${competencia.nivel}</td>
                <td style="display: none;" data-competencia-id="${competencia.id}"></td>
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
                        const competenciaId = competencia.id;
                        this.controller.excluirCompetencia(competenciaId);

                        this.exibirCompetenciasDoCandidato();
                    });
                }
            }
        }
    }

   
    adicionarCompetencia() {
        const competencia = this.pegarValoresDoFormulario();
        this.controller.adicionarCompetencias(competencia);

        this.limparCamposDoFormulario();
        this.exibirCompetenciasDoCandidato();

    }

    async EdidarCompetencia() {
        const competenciaHtml =  this.pegarValoresDoFormulario();

        if (this.competenciaEmEdicaoIndex != null) {
            const competenciaEditada = await this.controller.buscarCompetenciaPorId(this.competenciaEmEdicaoIndex);

            if (competenciaEditada) {
                competenciaEditada.idCompetencia = competenciaHtml.nome
                competenciaEditada.idNivelCompetencia = competenciaHtml.nivel

                console.log(competenciaEditada)

                this.controller.atualizarCompetencia(competenciaEditada);
                this.limparCamposDoFormulario()
                this.exibirCompetenciasDoCandidato();
                this.competenciaEmEdicaoIndex = null;
            }
        }
    }
}
export default PerfilCandidatoCompetenciaView;