import Experiencia from "../../modelo/Experiencia";
import ExperienciaService from "../../service/ExperienciaService";
import UsuarioService from "../../service/usuarioService";

class PerfilCandidatoExperienciaController{
    private usuarioService: UsuarioService;
    private experienciaService: ExperienciaService;
    private experienciaEmEdicaoIndex: number | null = null;

    constructor(){
        this.usuarioService = new UsuarioService();
        this.experienciaService = new ExperienciaService();

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

        this.exibirExperienciaDoCandidato();
    }

    preencherCamposDeEdicaoExperiencia(experenciaIndex: number) {
        const experienciaList = document.getElementById('experiencias-list');

        if (experenciaIndex >= 0 && experienciaList) {
            const rows = experienciaList.getElementsByTagName('tr');
            if (experenciaIndex < rows.length) {
                const row = rows[experenciaIndex];
                const cargo = row.cells[0].textContent;
                const empresa = row.cells[1].textContent;
                const nivel = row.cells[2].textContent;

                const cargoElement = document.getElementById('cargoExperiencia') as HTMLInputElement;
                const empresaElement = document.getElementById('empresaExperiencia') as HTMLInputElement;
                const nivelElement = document.getElementById('nivelExperiencia') as HTMLInputElement;

                cargoElement.value = cargo!;
                empresaElement.value = empresa!;
                nivelElement.value = nivel!;

                this.experienciaEmEdicaoIndex = experenciaIndex;
            }
        }
    }

    exibirExperienciaDoCandidato() {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado()
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);

        if (candidatoLogado) {
            const experiencias = this.experienciaService.obterExperienciasDoCandidato(idCandidato);
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
                            const rowIndex = Array.from(experienciasList.children).indexOf(row);
                            this.preencherCamposDeEdicaoExperiencia(rowIndex);
                        });
                    }

                    const excluirButton = row.querySelector('.excluir-button');
                    if (excluirButton) {
                        excluirButton.addEventListener('click', () => {
                            const experienciaId = experiencia.id;

                            this.experienciaService.excluirExperienciaDoCandidato(idCandidato, experienciaId);

                            this.exibirExperienciaDoCandidato();
                        });
                    }
                }
            }
        } else {
            console.error('Candidato logado não encontrado.');
        }
    }

    adicionarExperiencia(){
        const cargoElement = document.getElementById('cargoExperiencia') as HTMLInputElement;
        const empresaElement = document.getElementById('empresaExperiencia') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelExperiencia') as HTMLInputElement;

        const cargo = cargoElement.value;
        const empresa = empresaElement.value;

        const nivel = nivelElement.value;
        const nivelExperiencia = this.nivelMap[nivel];

        const idCandidato = this.usuarioService.obterIdUsuarioLogado();
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato)
        
        const novaExperiencia = new Experiencia(idCandidato, cargo, empresa, nivelExperiencia);

        if (candidatoLogado) {
            candidatoLogado.experiencias.push(novaExperiencia);

            this.experienciaService.adicionarExperienciaAoCandidato(candidatoLogado.id, novaExperiencia);

            cargoElement.value = '';
            empresaElement.value = '';
            nivelElement.value = '';

            this.exibirExperienciaDoCandidato();
        } else {
            console.error('Candidato logado não encontrado.');
        }
    }

    editarExperiencia(){
        const cargoElement = document.getElementById('cargoExperiencia') as HTMLInputElement;
        const empresaElement = document.getElementById('empresaExperiencia') as HTMLInputElement;
        const nivelElement = document.getElementById('nivelExperiencia') as HTMLInputElement;

        const novoCargo = cargoElement.value;
        const novaEmpresa = empresaElement.value;
        const novoNivel = parseInt(nivelElement.value);
    
        if (novoCargo && novaEmpresa && novoNivel) {
            const idCandidato = this.usuarioService.obterIdUsuarioLogado()
            const candidato = this.usuarioService.obterCandidato(idCandidato)
    
            if (candidato) {
                const novasExperiencias = candidato.experiencias.slice();
    
                if (this.experienciaEmEdicaoIndex !== null) {
                    const experienciaEditada = novasExperiencias[this.experienciaEmEdicaoIndex];
    
                    experienciaEditada.cargo = novoCargo;
                    experienciaEditada.empresa = novaEmpresa;
                    experienciaEditada.nivel = novoNivel;
    
                    this.experienciaService.atualizarExperienciasDoCandidato(idCandidato, novasExperiencias);
    
                    cargoElement.value = '';
                    empresaElement.value = '';
                    nivelElement.value = '1';
    
                    this.experienciaEmEdicaoIndex = null;
                    this.exibirExperienciaDoCandidato();
                }
            } else {
                console.error('Candidato logado não encontrado.');
            }
        } else {
            console.error('Todos os campos são obrigatórios.');
        }
    }

    nivelMap: { [key: string]: number } = {
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5":5
    };

}
export default PerfilCandidatoExperienciaController;