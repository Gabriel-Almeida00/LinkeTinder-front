import Candidato from "../modelo/candidato";
import CandidatoService from "../service/candidatoService";
import Competencia from "../modelo/competencia";
import NivelCompetencia from "../modelo/enum/nivelCompetencia";
import NivelExperiencia from "../modelo/enum/nivelExperiencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";
import Chart from 'chart.js/auto';
import Formacao from "../modelo/formacao";
import Experiencia from "../modelo/experiencia";
import UsuarioService from "../service/usuarioService";
import CandidatoDTO from "../modelo/dto/candidatoDTO";
import Vaga from "../modelo/vaga";


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
        document.addEventListener('DOMContentLoaded', () => {
            this.listarCandidatos();
            const dadosCompetencias = this.obterContagemCompetencias();
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
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const cepInput = document.getElementById('cep') as HTMLInputElement;
        const cpfInput = document.getElementById('cpf') as HTMLInputElement;
        const idadeInput = document.getElementById('idade') as HTMLInputElement;
        const estadoInput = document.getElementById('estado') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricao') as HTMLInputElement;
        const telefoneInput = document.getElementById('telefone') as HTMLInputElement;
        const linkedinInput = document.getElementById('linkedin') as HTMLInputElement;
    
        if (
            !this.validarCPF(cpfInput.value) ||
            !this.validarNome(nomeInput.value) ||
            !this.validarEmail(emailInput.value) ||
            !this.validarTelefone(telefoneInput.value) ||
            !this.validarLinkedin(linkedinInput.value)
        ) {
            alert('Por favor, preencha os campos corretamente.');
            return null;
        }
    
        const competencias: Competencia[] = this.obterCompetencias();
        const formacoes: Formacao[] = this.obterFormacoes();
        const experiencias: Experiencia[] = this.obterExperiencias();
    
        return new Candidato(
            nomeInput.value,
            emailInput.value,
            cepInput.value,
            cpfInput.value,
            parseInt(idadeInput.value),
            estadoInput.value,
            parseInt(telefoneInput.value),
            linkedinInput.value,
            descricaoInput.value,
            competencias,
            formacoes,
            experiencias
        );
    }
    
    public cadastrarCandidato(): void {
        const novoCandidato = this.obterValoresDosCampos();
        
        if (novoCandidato) {
            this.candidatoService.cadastrarCandidato(novoCandidato);
            this.limparCamposDoFormulario();
            window.location.href = '../../paginas/login/login.html';
        }
    }
    
    private limparCamposDoFormulario(): void {
        const camposParaLimpar = ['nome', 'email', 'cep', 'cpf', 'idade', 'estado', 'descricao', 'telefone', 'linkedin'];
        
        camposParaLimpar.forEach((campo) => {
            const elemento = document.getElementById(campo) as HTMLInputElement;
            elemento.value = '';
        });
    }
    

    private obterFormacoes(): Formacao[] {
        const formacoes: Formacao[] = [];
        const listaFormacoes = document.getElementById('lista-formacoes') as HTMLUListElement;
    
        const itensFormacoes = listaFormacoes.querySelectorAll('li');
        
        itensFormacoes.forEach(item => {
            const formacao = this.parseFormacao(item.textContent || '');
            if (formacao) {
                formacoes.push(formacao);
            }
        });
    
        return formacoes;
    }
    
    private parseFormacao(textoFormacao: string): Formacao | null {
        const partes = textoFormacao.split(' - ');
    
        if (partes.length !== 4) {
            return null;
        }
    
        const [curso, faculdade, nivelTexto, anoConclusaoStr] = partes;
        const nivel = NivelFormacao[nivelTexto as keyof typeof NivelFormacao] || NivelFormacao.Graduacao;
        const anoConclusao = parseInt(anoConclusaoStr);
    
        return new Formacao(curso, faculdade, nivel, anoConclusao);
    }
    
    private obterExperiencias(): Experiencia[] {
        const experiencias: Experiencia[] = [];
        const listaExperiencias = document.getElementById('lista-experiencias') as HTMLUListElement;
        const itensExperiencias = listaExperiencias.querySelectorAll('li');
        
        itensExperiencias.forEach(item => {
            const experiencia = this.parseExperienciaFromItem(item);
            if (experiencia) {
                experiencias.push(experiencia);
            }
        });
    
        return experiencias;
    }
    
    private parseExperienciaFromItem(item: Element): Experiencia | null {
        const textoExperiencia = item.textContent || '';
        const partes = textoExperiencia.split(' - ');
    
        if (partes.length !== 3) {
            return null; 
        }
    
        const cargo = partes[0];
        const empresa = partes[1];
        const nivelTexto = partes[2];
        
        const nivel = NivelExperiencia[nivelTexto as keyof typeof NivelExperiencia] || NivelExperiencia.Junior;
        
        return new Experiencia(cargo, empresa, nivel);
    }
    
    
    private obterCompetencias(): Competencia[] {
        const competencias: Competencia[] = [];
        const listaCompetencias = document.getElementById('lista-competencias') as HTMLUListElement;
        const itensCompetencias = listaCompetencias.querySelectorAll('li');
        
        itensCompetencias.forEach(item => {
            const competencia = this.parseCompetenciaFromItem(item);
            if (competencia) {
                competencias.push(competencia);
            }
        });
    
        return competencias;
    }
    
    private parseCompetenciaFromItem(item: Element): Competencia | null {
        const textoCompetencia = item.textContent || '';
        const partes = textoCompetencia.split(' - ');
    
        if (partes.length !== 2) {
            return null; 
        }
    
        const nome = partes[0];
        const nivelTexto = partes[1];
        
        const nivel = NivelCompetencia[nivelTexto as keyof typeof NivelCompetencia] || NivelCompetencia.Basico;
    
        return new Competencia(nome, nivel);
    }
    
    
    listarCandidatos(): void {
        const candidatosDTO = this.candidatoService.listarCandidatosDTO();
        const listaCandidatos = document.getElementById('lista-candidatos') as HTMLUListElement;
    
        listaCandidatos.innerHTML = '';
    
        candidatosDTO.forEach((candidatoDTO, index) => {
            const li = this.criarCandidatoElement(candidatoDTO, index);
            listaCandidatos.appendChild(li);
        });
    }
    
    private criarCandidatoElement(candidatoDTO: CandidatoDTO, index: number): HTMLElement {
        const li = document.createElement('li');
        li.setAttribute("class", "candidato-item");
        li.setAttribute("data-index", index.toString());
    
        const empresaLogada = this.usuarioService.obterEmpresaLogado();
        if (empresaLogada) {
            const afinidadesHtml = this.obterAfinidadesHtml(candidatoDTO, empresaLogada.vagas);
            const informacoesCandidatoHtml = this.obterInformacoesCandidatoHtml(candidatoDTO);
    
            li.innerHTML = `
                <div class="informacoes-candidato hidden">
                    ${informacoesCandidatoHtml}
                    ${afinidadesHtml}
                </div>
                <br>
                <strong>Descrição Pessoal:</strong> ${candidatoDTO.descricaoPessoal}<br>
                <strong>Competências:</strong> ${this.obterCompetenciasTexto(candidatoDTO.competencias)}
            `;
        }
    
        return li;
    }
    
    private obterAfinidadesHtml(candidatoDTO: CandidatoDTO, vagas: Vaga[]): string {
        let afinidadesHtml = '';
        vagas.forEach(vaga => {
            const afinidade = this.candidatoService.calcularAfinidadeCandidatoComVaga(candidatoDTO, [vaga]);
            afinidadesHtml += `<p>Afinidade com ${vaga.nome}: ${afinidade.toFixed(2)}%</p>`;
        });
        return afinidadesHtml;
    }
    
    private obterInformacoesCandidatoHtml(candidatoDTO: CandidatoDTO): string {
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
    
    private obterCompetenciasTexto(competencias: Competencia[]): string {
        return competencias.map(comp => `${comp.nome} - ${comp.nivel}`).join(', ');
    }
    
    
    associarEventosInformacoesCandidato() {
        const listaCandidatos = document.getElementById("lista-candidatos");
        const candidatosInfos = this.candidatoService.listarCandidatosDTO();
    
        if (listaCandidatos) {
            listaCandidatos.addEventListener("mouseover", (event) => {
                this.mostrarInformacoesCandidato(event, candidatosInfos);
            });
    
            listaCandidatos.addEventListener("mouseout", (event) => {
                this.ocultarInformacoesCandidato(event);
            });
        }
    }
    
    mostrarInformacoesCandidato(event: MouseEvent, candidatosInfos: CandidatoDTO[]) {
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
    
    obterContagemCompetencias(): { [competencia: string]: number } {
        const competenciasCount: { [competencia: string]: number } = {};
    
        this.candidatoService.listarCandidatos().forEach(candidato => {
            candidato.competencias.forEach(competencia => {
                const nomeCompetencia = competencia.nome;
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