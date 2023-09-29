import Formacao from "../modelo/Formacao";
import FormacaoService from "../service/FormacaoService";
import UsuarioService from "../service/usuarioService";

class PerfilCandidatoFormacaoController {
    private usuarioService: UsuarioService;
    private formacaoService: FormacaoService;
    private formacaoEmEdicaoIndex: number | null = null;

    constructor() {
        this.usuarioService = new UsuarioService();
        this.formacaoService = new FormacaoService();

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

        this.exibirFormacoesDoCandidato();
    }

    adicionarFormacao() {
        const instituicaoElement = document.getElementById('instituicaoFormacao') as HTMLInputElement;
        const cursoElement = document.getElementById('cursoFormacao') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelFormacao') as HTMLInputElement;
        const anoConclusaoElement = document.getElementById('anoConclusaoFormacao') as HTMLInputElement;

        const instituicao = instituicaoElement.value;
        const curso = cursoElement.value;
        const nivel = nivelElement.value;
        const anoConclusao = anoConclusaoElement.value;

        const nivelFormacao = this.nivelMap[nivel];



        const idCandidato = this.usuarioService.obterIdCandidatoLogado();
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato)
        
        const novaFormacao = new Formacao(idCandidato, instituicao, curso, nivelFormacao, anoConclusao);

        if (candidatoLogado) {
            candidatoLogado.formacoes.push(novaFormacao);

            this.formacaoService.adicionarFormacaoAoCandidato(candidatoLogado.id, novaFormacao);

            instituicaoElement.value = '';
            cursoElement.value = '';
            anoConclusaoElement.value = '';

            this.exibirFormacoesDoCandidato();
        } else {
            console.error('Candidato logado não encontrado.');
        }
    }

    preencherCamposDeEdicaoFormacao(formacaoIndex: number) {
        const formacoesList = document.getElementById('formacoes-list');

        if (formacaoIndex >= 0 && formacoesList) {
            const rows = formacoesList.getElementsByTagName('tr');
            if (formacaoIndex < rows.length) {
                const row = rows[formacaoIndex];
                const instituicao = row.cells[0].textContent;
                const curso = row.cells[1].textContent;
                const nivel = row.cells[2].textContent;
                const anoConclusao = row.cells[3].textContent;

                const instituicaoElement = document.getElementById('instituicaoFormacao') as HTMLInputElement;
                const cursoElement = document.getElementById('cursoFormacao') as HTMLInputElement;
                const nivelElement = document.getElementById('nivelFormacao') as HTMLInputElement;
                const anoConclusaoElement = document.getElementById('anoConclusaoFormacao') as HTMLInputElement;

                instituicaoElement.value = instituicao!;
                cursoElement.value = curso!;
                nivelElement.value = nivel!;
                anoConclusaoElement.value = anoConclusao!;

                this.formacaoEmEdicaoIndex = formacaoIndex;
            }
        }
    }

    editarFormacao() {
        const instituicaoElement = document.getElementById('instituicaoFormacao') as HTMLInputElement;
        const cursoElement = document.getElementById('cursoFormacao') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelFormacao') as HTMLInputElement;
        const anoConclusaoElement = document.getElementById('anoConclusaoFormacao') as HTMLInputElement;
    
        const novaInstituicao = instituicaoElement.value;
        const novoCurso = cursoElement.value;
        const novoNivel = parseInt(nivelElement.value);
        const novoAnoConclusao = anoConclusaoElement.value;
    
        if (novaInstituicao && novoCurso && novoNivel && novoAnoConclusao) {
            const idCandidato = this.usuarioService.obterIdCandidatoLogado()
            const candidato = this.usuarioService.obterCandidato(idCandidato)
    
            if (candidato) {
                const novasFormacoes = candidato.formacoes.slice();
    
                if (this.formacaoEmEdicaoIndex !== null) {
                    const formacaoEditada = novasFormacoes[this.formacaoEmEdicaoIndex];
    
                    formacaoEditada.instituicao = novaInstituicao;
                    formacaoEditada.curso = novoCurso;
                    formacaoEditada.nivel = novoNivel;
                    formacaoEditada.anoConclusao = novoAnoConclusao;
    
                    this.formacaoService.atualizarFormacoesDoCandidato(idCandidato, novasFormacoes);
    
                    instituicaoElement.value = '';
                    cursoElement.value = '';
                    nivelElement.value = '1';
                    anoConclusaoElement.value = '';
    
                    this.formacaoEmEdicaoIndex = null;
    
                    this.exibirFormacoesDoCandidato();
                }
            } else {
                console.error('Candidato logado não encontrado.');
            }
        } else {
            console.error('Todos os campos são obrigatórios.');
        }
    }

    exibirFormacoesDoCandidato() {
        const idCandidato = this.usuarioService.obterIdCandidatoLogado()
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);

        if (candidatoLogado) {
            const formacoes = this.formacaoService.obterFormacoesDoCandidato(idCandidato);
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
                            const rowIndex = Array.from(formacoesList.children).indexOf(row);
                            this.preencherCamposDeEdicaoFormacao(rowIndex);
                        });
                    }

                    const excluirButton = row.querySelector('.excluir-button');
                    if (excluirButton) {
                        excluirButton.addEventListener('click', () => {
                            const formacaoId = formacao.id;

                            this.formacaoService.excluirFormacaoDoCandidato(idCandidato, formacaoId);

                            this.exibirFormacoesDoCandidato();
                        });
                    }
                }
            }
        } else {
            console.error('Candidato logado não encontrado.');
        }
    }

    nivelMap: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4
    };
}
export default PerfilCandidatoFormacaoController