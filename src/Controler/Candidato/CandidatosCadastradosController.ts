import Chart from 'chart.js/auto';

import Vaga from "../../modelo/Vaga";
import CandidatoService from "../../service/candidato/CandidatoService";
import UsuarioService from "../../service/usuario/UsuarioService";
import EmpresaService from "../../service/empresa/EmpresaService";
import CandidatoDTO from "../../modelo/CandidatoDTO";
import FormacaoDTO from "../../modelo/FormacaoDTO";
import ExperienciaDTO from "../../modelo/ExperienciaDTO";
import CompetenciaCandidatoDTO from "../../modelo/dto/CompetenciaCandidatoDTO";

class CandidatosCadastradosController {
    private candidatoService: CandidatoService;
    private usuarioService: UsuarioService;
    private empresaService: EmpresaService;

    constructor(candidatoService: CandidatoService, usuarioService: UsuarioService) {
        this.candidatoService = candidatoService;
        this.usuarioService = usuarioService;
        this.empresaService = new EmpresaService()
        this.onDOMContentLoaded();
    }


    private onDOMContentLoaded(): void {
        document.addEventListener('DOMContentLoaded', async () => {
            this.listarCandidatos();
            const dadosCompetencias = await this.obterContagemCompetencias();
            this.criarGraficoCompetencias(dadosCompetencias);
            this.associarEventosInformacoesCandidato();
        });
    }

    async listarCandidatos(): Promise<void> {
        const candidatosDTO = await this.candidatoService.listarCandidatos();
        const listaCandidatos = document.getElementById('lista-candidatos') as HTMLUListElement;

        listaCandidatos.innerHTML = '';

        candidatosDTO.forEach(async (candidatoDTO, index) => {
            const li = await this.criarCandidatoElement(candidatoDTO, index);
            listaCandidatos.appendChild(li);
        });
    }

    private async criarCandidatoElement(candidatoDTO: CandidatoDTO, index: number): Promise<HTMLElement> {
        const li = document.createElement('li');
        li.setAttribute("class", "candidato-item");
        li.setAttribute("data-index", index.toString());

        const idEmpresa = this.usuarioService.obterIdUsuarioLogado()
        const empresaLogada = this.empresaService.obterEmpresaPorId(idEmpresa);

        if (empresaLogada) {
            const afinidadesHtml = this.obterAfinidadesHtml(candidatoDTO, (await empresaLogada).vagas);
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

    private obterFormacoesTexto(formacoes: FormacaoDTO[]): string {
        return formacoes.map(formacao => `${formacao.cursoFormacao} - ${formacao.instituicaoFormacao}`).join(', ');
    }

    private obterExperienciasTexto(experiencias: ExperienciaDTO[]): string {
        return experiencias.map(experiencia => `${experiencia.cargoExperiencia} - ${experiencia.empresaExperiencia}`).join(', ');
    }

    private obterCompetenciasTexto(competencias: CompetenciaCandidatoDTO[]): string {
        return competencias.map(comp => `${comp.nome} `).join(', ');
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

    async obterContagemCompetencias(): Promise<{ [competencia: string]: number; }> {
        const competenciasCount: { [competencia: string]: number } = {};

        (await this.candidatoService.listarCandidatos()).forEach(candidato => {
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
export default CandidatosCadastradosController;