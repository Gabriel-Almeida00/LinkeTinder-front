import Candidato from "../modelo/Candidato";
import CandidatoService from "../service/candidato/CandidatoService";
import Competencia from "../modelo/Competencia";
import Chart from 'chart.js/auto';
import Formacao from "../modelo/Formacao";
import Experiencia from "../modelo/Experiencia";
import UsuarioService from "../service/usuario/UsuarioService";
import CandidatoDTO from "../modelo/dto/CandidatoDTO";
import Vaga from "../modelo/Vaga";
import CandidatoCompetencia from "../modelo/CandidatoCompetencia";
import TipoUsuario from "../modelo/enum/TipoUsuario";


export class CandidatoUI {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;

    constructor(candidatoService: CandidatoService, usuarioService: UsuarioService) {
        this.candidatoService = candidatoService;
        this.usuarioService = usuarioService;
        
        this.setupEventListeners();
        this.onDOMContentLoaded();
    }

    private setupEventListeners(): void {
        const cadastrarButton = document.getElementById('cadastrar-candidato-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarCandidato();
            });
        }
    }

    private onDOMContentLoaded(): void {
        document.addEventListener('DOMContentLoaded', async () => {
            this.listarCandidatos();
            const dadosCompetencias = await this.obterContagemCompetencias();
            this.criarGraficoCompetencias(dadosCompetencias);
            this.associarEventosInformacoesCandidato();
        });
    }
    
    private validarCPF(cpf: string): boolean {
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        return cpfRegex.test(cpf);
    }
    
    private validarNome(nome: string): boolean {
        const nomeRegex = /^[a-zA-Z\s]+$/;
        return nomeRegex.test(nome);
    }
    
    private validarEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }
    
    private validarTelefone(telefone: string): boolean {
        const telefoneRegex = /^(\(?\d{2}\)?\s?)?(\d{4,5}-?\d{4})$/;
        return telefoneRegex.test(telefone);
    }
    
    private validarLinkedin(linkedin: string): boolean {
        const linkedinRegex = /^https:\/\/www\.linkedin\.com\/in\/[A-Za-z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;
        return linkedinRegex.test(linkedin);
    }
    
    private obterValoresDosCampos(): Candidato | null {
        const nomeInput = document.getElementById('nome') as HTMLInputElement;
        const sobrenomeInput = document.getElementById('sobrenome') as HTMLInputElement;
        const dataNascimentoInput = document.getElementById('dataNascimento') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const paisInput = document.getElementById('pais') as HTMLInputElement;
        const cepInput = document.getElementById('cep') as HTMLInputElement;
        const cpfInput = document.getElementById('cpf') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricao') as HTMLInputElement;
        const senhaInput = document.getElementById('senha') as HTMLInputElement;
        const linkedinInput = document.getElementById('linkedin') as HTMLInputElement;
        const telefoneInput = document.getElementById('telefone') as HTMLInputElement;


        if (
            !this.validarCPF(cpfInput.value) ||
            !this.validarNome(nomeInput.value) ||
            !this.validarEmail(emailInput.value) ||
            !this.validarTelefone(telefoneInput.value) ||
            !this.validarLinkedin(linkedinInput.value)
        ) {
            alert('Por favor, preencha os campos corretamente.');
        }
    
        const dataNascimentoValue = dataNascimentoInput.value;
        const dataNascimento = new Date(dataNascimentoValue);

    
        return new Candidato(
           nomeInput.value,
           emailInput.value,
           paisInput.value,
           cepInput.value,
           linkedinInput.value,
           telefoneInput.value,
           descricaoInput.value,
           senhaInput.value,
           sobrenomeInput.value,
           dataNascimento,
           cpfInput.value,
           TipoUsuario.Candidato
        );
    }
    
    public cadastrarCandidato(): void {
        const novoCandidato = this.obterValoresDosCampos();
        
        if (novoCandidato) {
            this.candidatoService.adicionarCandidato(novoCandidato);
            this.limparCamposDoFormulario();
            window.location.href = '../../paginas/login/login.html';
        }
    }
    
    private limparCamposDoFormulario(): void {
        const camposParaLimpar = ['nome', 'sobrenome', 'dataNascimento', 'email', 'pais', 'cep',
         'cpf', 'descricao', 'senha', 'linkedin', 'telefone'];
        
        camposParaLimpar.forEach((campo) => {
            const elemento = document.getElementById(campo) as HTMLInputElement;
            elemento.value = '';
        });
    }
    
    
    async listarCandidatos(): Promise<void> {
        const candidatosDTO = await this.candidatoService.listarCandidatos();
        const listaCandidatos = document.getElementById('lista-candidatos') as HTMLUListElement;
    
        listaCandidatos.innerHTML = '';
    
        candidatosDTO.forEach((candidatoDTO, index) => {
            const li = this.criarCandidatoElement(candidatoDTO, index);
            listaCandidatos.appendChild(li);
        });
    }
    
    private criarCandidatoElement(candidatoDTO: Candidato, index: number): HTMLElement {
        const li = document.createElement('li');
        li.setAttribute("class", "candidato-item");
        li.setAttribute("data-index", index.toString());
    
        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        const empresaLogada = this.usuarioService.obterEmpresa(idEmpresa);
        if (empresaLogada) {
            const afinidadesHtml = this.obterAfinidadesHtml(candidatoDTO, empresaLogada.vagas);
            const informacoesCandidatoHtml = this.obterInformacoesCandidatoHtml(candidatoDTO);
    
            li.innerHTML = `
                <div class="informacoes-candidato hidden">
                    ${informacoesCandidatoHtml}
                    ${afinidadesHtml}
                </div>
                <br>
                <strong>Descrição Pessoal:</strong> ${candidatoDTO.descricao}<br>
                <strong>Competências:</strong> ${this.obterCompetenciasTexto(candidatoDTO.competencias)}
            `;
        }
    
        return li;
    }
    
    private obterAfinidadesHtml(candidatoDTO: Candidato, vagas: Vaga[]): string {
        let afinidadesHtml = '';
        vagas.forEach(vaga => {
            const afinidade = this.candidatoService.calcularAfinidadeCandidatoComVaga(candidatoDTO, [vaga]);
            afinidadesHtml += `<p>Afinidade com ${vaga.nome}: ${afinidade.toFixed(2)}%</p>`;
        });
        return afinidadesHtml;
    }
    
    private obterInformacoesCandidatoHtml(candidatoDTO: Candidato): string {
        return `
            <p class="formacao-candidato">Formação: ${this.obterFormacoesTexto(candidatoDTO.formacoes)}</p>
            <p class="experiencia-candidato">Experiência: ${this.obterExperienciasTexto(candidatoDTO.experiencias)}</p>
        `;
    }
    
    private obterFormacoesTexto(formacoes: Formacao[]): string {
        return formacoes.map(formacao => `${formacao.curso} - ${formacao.instituicao}`).join(', ');
    }
    
    private obterExperienciasTexto(experiencias: Experiencia[]): string {
        return experiencias.map(experiencia => `${experiencia.cargo} - ${experiencia.empresa}`).join(', ');
    }
    
    private obterCompetenciasTexto(competencias: CandidatoCompetencia[]): string {
        return competencias.map(comp => `${comp.nivel} `).join(', ');
    }
    
    
    async associarEventosInformacoesCandidato() {
        const listaCandidatos = document.getElementById("lista-candidatos");
        const candidatosInfos = await this.candidatoService.listarCandidatos();
    
        if (listaCandidatos) {
            listaCandidatos.addEventListener("mouseover", (event) => {
                return this.mostrarInformacoesCandidato(event, candidatosInfos);
            });
    
            listaCandidatos.addEventListener("mouseout", (event) => {
                this.ocultarInformacoesCandidato(event);
            });
        }
    }
    
    mostrarInformacoesCandidato(event: MouseEvent, candidatosInfos: Candidato[]) {
        const candidatoItem = this.encontrarCandidatoItem(event.target as HTMLElement);
        if (candidatoItem) {
            const index = parseInt(candidatoItem.getAttribute("data-index") || "");
            const candidatoInfo = candidatosInfos[index];
    
            if (candidatoInfo) {
                const informacoesCandidato = candidatoItem.querySelector(".informacoes-candidato");
                if (informacoesCandidato) {
                    informacoesCandidato.classList.remove("hidden");
                }
            }
        }
    }
    
    ocultarInformacoesCandidato(event: MouseEvent) {
        const candidatoItem = this.encontrarCandidatoItem(event.target as HTMLElement);
        if (candidatoItem) {
            const informacoesCandidato = candidatoItem.querySelector(".informacoes-candidato");
            if (informacoesCandidato) {
                informacoesCandidato.classList.add("hidden");
            }
        }
    }

    encontrarCandidatoItem(element: HTMLElement | null): HTMLElement | null {
        while (element) {
            if (element.tagName === "LI") {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }
    
    async obterContagemCompetencias(): Promise<{ [competencia: string]: number; }> {
        const competenciasCount: { [competencia: string]: number } = {};
    
        (await this.candidatoService.listarCandidatos()).forEach(candidato => {
            candidato.competencias.forEach(competencia => {
                const nomeCompetencia = competencia.nivel;
                if (!competenciasCount[nomeCompetencia]) {
                    competenciasCount[nomeCompetencia] = 0;
                }
                competenciasCount[nomeCompetencia]++;
            });
        });
    
        return competenciasCount;
    }

    criarGraficoCompetencias(dadosCompetencias: { [competencia: string]: number }): void {
        const canvas = document.getElementById('competencias-chart') as HTMLCanvasElement;
        if (!canvas) {
            console.error("Element with ID 'competencias-chart' not found.");
            return;
        }
    
        const { labels, data } = this.obterDadosGrafico(dadosCompetencias);
    
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Canvas context not available.");
            return;
        }
    
        this.inicializarGrafico(ctx, labels, data);
    }
    
    obterDadosGrafico(dadosCompetencias: { [competencia: string]: number }): { labels: string[], data: number[] } {
        const labels = Object.keys(dadosCompetencias);
        const data = Object.values(dadosCompetencias);
        return { labels, data };
    }
    
    inicializarGrafico(ctx: CanvasRenderingContext2D, labels: string[], data: number[]): void {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Número de Candidatos por Competência',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    }
                }
            }
        });
    }    
}
export default CandidatoUI;