import Vaga from "../../modelo/Vaga";
import EmpresaService from "../../service/empresa/EmpresaService";
import UsuarioService from "../../service/usuario/UsuarioService";
import VagaService from "../../service/vaga/VagaService";

class PerfilEmpresaVagasController {
    private usuarioService: UsuarioService;
    private empresaService: EmpresaService;
    private vagaEmEdicaoIndex: number | null = null;
    private vagaService: VagaService

    constructor() {
        this.usuarioService = new UsuarioService();
        this.empresaService = new EmpresaService();
        this.vagaService = new VagaService()

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

    adicionarVaga() {
        const nomeElement = document.getElementById('nomeVaga') as HTMLInputElement;
        const descricaoElement = document.getElementById('descricaoVaga') as HTMLSelectElement;
        const cidadeElement = document.getElementById('cidadeVaga') as HTMLSelectElement;
        const nivelFormacaoElement = document.getElementById('nivelFormacao') as HTMLSelectElement;
        const nivelExperienciaElement = document.getElementById('nivelExperiencia') as HTMLSelectElement;

        const nome = nomeElement.value;
        const descricao = descricaoElement.value;
        const cidade = cidadeElement.value;
        const nivelFormacaoString = nivelFormacaoElement.value;
        const nivelExperienciaString = nivelExperienciaElement.value;

        if(nome && descricao && cidade && nivelFormacaoString && nivelExperienciaString){
            const nivelFormcao = this.nivelMap[nivelFormacaoString]
            const nivelExperiencia = this.nivelMap[nivelExperienciaString]
            const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
            const empresa = this.usuarioService.obterEmpresa(idEmpresa);

            const novaVaga = new Vaga(
                idEmpresa,
                nome,
                descricao,
                cidade,
                nivelFormcao,
                nivelExperiencia
            );

            empresa.vagas.push(novaVaga);
            this.vagaService.adicionarVagaAEmpresa(idEmpresa, novaVaga);

            nomeElement.value = '';
            descricaoElement.value = '';
            cidadeElement.value = '';
            nivelExperienciaElement.value = '';
            nivelFormacaoElement.value = '';

            this.exibirVagasDaEmpresa();
        }
    }

    atualizarVaga() {
        const nomeElement = document.getElementById('nomeVaga') as HTMLInputElement;
        const descricaoElement = document.getElementById('descricaoVaga') as HTMLSelectElement;
        const cidadeElement = document.getElementById('cidadeVaga') as HTMLSelectElement;
        const nivelFormacaoElement = document.getElementById('nivelFormacao') as HTMLSelectElement;
        const nivelExperienciaElement = document.getElementById('nivelExperiencia') as HTMLSelectElement;

        const novoNome = nomeElement.value;
        const novaDescricao = descricaoElement.value;
        const novaCidade = cidadeElement.value;
        const novoNivelFormacaoString = nivelFormacaoElement.value;
        const novoNivelExperienciaString = nivelExperienciaElement.value;

        if(novoNome && novaDescricao && novaCidade && novoNivelFormacaoString && novoNivelExperienciaString){
            const novoNivelFormacao = parseInt(novoNivelFormacaoString);
            const novoNivelExperiencia = parseInt(novoNivelExperienciaString);
            const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
            const empresa = this.usuarioService.obterEmpresa(idEmpresa);

            if(empresa){
                const novasVagas = empresa.vagas.slice();

                if(this.vagaEmEdicaoIndex != null){
                    const vagaAtualizada = novasVagas[this.vagaEmEdicaoIndex];

                    vagaAtualizada.nome = novoNome;
                    vagaAtualizada.descricao = novaDescricao;
                    vagaAtualizada.cidade = novaCidade;
                    vagaAtualizada.formacaoMinima = novoNivelFormacao;
                    vagaAtualizada.experienciaMinima = novoNivelExperiencia;

                    this.vagaService.atualizarVagaDaEmpresa(idEmpresa, novasVagas);

                    nomeElement.value = '';
                    descricaoElement.value = '';
                    cidadeElement.value = '';
                    nivelExperienciaElement.value = '1';
                    nivelFormacaoElement.value = '1'

                    this.vagaEmEdicaoIndex = null;
                    this.exibirVagasDaEmpresa();
                }
            }
        }
    }

    preencherCamposDeEdicao(vagaIndex: number) {
        const vagasList = document.getElementById('vagas-list');

        if (vagaIndex >= 0 && vagasList) {
            const rows = vagasList.getElementsByTagName('tr');
            if (vagaIndex < rows.length) {
                const row = rows[vagaIndex];
                const nome = row.cells[0].textContent;
                const descricao = row.cells[1].textContent;
                const cidade = row.cells[2].textContent;
                const nivelFormacao = row.cells[3].textContent;
                const nvelExperiencia = row.cells[4].textContent;

                const nomeElement = document.getElementById('nomeVaga') as HTMLInputElement;
                const descricaoElement = document.getElementById('descricaoVaga') as HTMLSelectElement;
                const cidadeElement = document.getElementById('cidadeVaga') as HTMLSelectElement;
                const nivelFormacaoElement = document.getElementById('nivelFormacao') as HTMLSelectElement;
                const nivelExperienciaElement = document.getElementById('nivelExperiencia') as HTMLSelectElement;

                nomeElement.value = nome!;
                descricaoElement.value = descricao!;
                cidadeElement.value = cidade!;

                const nivelFormacaoOption = nivelFormacaoElement.querySelector(`option[value="${nivelFormacao}"]`) as HTMLSelectElement;
                const nivelExperienciaOption = nivelExperienciaElement.querySelector(`option[value="${nvelExperiencia}"]`) as HTMLSelectElement;

                nivelFormacaoElement.value = nivelFormacaoOption.value;
                nivelExperienciaElement.value = nivelExperienciaOption.value;


                this.vagaEmEdicaoIndex = vagaIndex;
            }
        }
    }



    exibirVagasDaEmpresa() {
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado();
        const empresa = this.usuarioService.obterEmpresa(idEmpresa);

        if (empresa) {
            const vagas = this.vagaService.obterVagasDaEmpresa(idEmpresa);
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
                        editarButton.addEventListener('click', (event) => {
                            const rowIndex = Array.from(vagasList.children).indexOf(row);
                            this.preencherCamposDeEdicao(rowIndex);
                        });
                    }

                    const excluirButton = row.querySelector('.excluir-button');
                    if (excluirButton) {
                        excluirButton.addEventListener('click', () => {
                            const idVaga = vaga.id;

                            this.vagaService.excluirVagaDaEmpresa(idEmpresa, idVaga);

                            this.exibirVagasDaEmpresa();
                        });
                    }
                }
            }
        }
    }

    nivelMap: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5
    };
}
export default PerfilEmpresaVagasController;