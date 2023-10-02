import VagaCompetencia from "../../modelo/VagaCompetencia";
import EmpresaService from "../../service/EmpresaService";
import UsuarioService from "../../service/UsuarioService";

class PerfilEmpresaCompetenciaVagaController {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;
    private CompetenciaEmEdicaoIndex: number | null = null;
    private idVaga!: string;

    constructor() {
        this.empresaService = new EmpresaService();
        this.usuarioService = new UsuarioService();

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
                        const dataCompetenciaId = button.getAttribute('data-competencia-id');
                        if (dataCompetenciaId !== null) {
                            this.idVaga = dataCompetenciaId;
                            const competenciasVagaContainer = document.getElementById(`competencias-vaga-container`);

                            if (competenciasVagaContainer && this.idVaga) {
                                if (competenciasVagaContainer.style.display === 'none' || competenciasVagaContainer.style.display === '') {
                                    competenciasVagaContainer.style.display = 'block';
                                    this.exibirCompetenciasDaVaga(this.idVaga);
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

    adicionarCompetencia() {
        const nomeElement = document.getElementById('idCompetenciaVaga') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;

        const nome = nomeElement.value;
        const nivelString = nivelElement.value;

        if (nome && nivelString) {
            const nivel = this.nivelMap[nivelString]

            const novaCompetencia = new VagaCompetencia(
                this.idVaga,
                nome,
                nivel
            );
            this.empresaService.adicionarCompetenciaAVaga(novaCompetencia);

            nomeElement.value = '';
            nivelElement.value = '';

            this.exibirCompetenciasDaVaga(this.idVaga);
        }
    }

    atualizarCompetencia() {
        const nomeElement = document.getElementById('idCompetenciaVaga') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelCompetencia') as HTMLSelectElement;
    
        const novoNome = nomeElement.value;
        const novoNivelString = nivelElement.value;
    
        if (novoNome && novoNivelString) {
            const novoNivel = parseInt(novoNivelString);
    
            if (this.CompetenciaEmEdicaoIndex !== null) {
                const idVaga = this.idVaga; 
                const idCompetencia = this.CompetenciaEmEdicaoIndex; 
    
                const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
                const empresa = this.usuarioService.obterEmpresa(idEmpresa);
    
                if (empresa) {
                    const vagas = this.empresaService.obterVagasDaEmpresa(idEmpresa);
    
                    const vaga = vagas.find((v) => v.id === idVaga);
    
                    if (vaga) {
                        if (vaga.competencias && vaga.competencias.length > idCompetencia) {
                            vaga.competencias[idCompetencia].idCompetencia = novoNome;
                            vaga.competencias[idCompetencia].nivel = novoNivel;
    
                            this.empresaService.atualizarVagaDaEmpresa(idEmpresa, vagas);
    
                            nomeElement.value = '';
                            nivelElement.value = '1';
    
                            this.CompetenciaEmEdicaoIndex = null;
    
                            this.exibirCompetenciasDaVaga(idVaga);
                        }
                    }
                }
            }
        }
    }
    

    preencherCamposDeEdicao(competenciaIndex: number) {
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

                this.CompetenciaEmEdicaoIndex = competenciaIndex;
            }
        }
    }

    exibirCompetenciasDaVaga(idVaga: string) {
        const competencias = this.empresaService.obterCompetenciasDaVaga(idVaga);
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
                        this.preencherCamposDeEdicao(rowIndex);
                    });
                }

                const excluirButton = row.querySelector('.excluir-competencia-button');
                if (excluirButton) {
                    excluirButton.addEventListener('click', () => {
                        const idCompetencia = competencia.id
                        this.empresaService.excluirCompetenciaDaVaga(idVaga, idCompetencia)
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
export default PerfilEmpresaCompetenciaVagaController;