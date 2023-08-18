import Candidato from "../modelo/candidato";
import CandidatoService from "../service/candidatoService";
import Competencia from "../modelo/competencia";
import NivelCompetencia from "../modelo/enum/nivelCompetencia";
import NivelExperiencia from "../modelo/enum/nivelExperiencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";
import Chart from 'chart.js/auto';
import Formacao from "../modelo/formacao";
import Experiencia from "../modelo/experiencia";


export class CandidatoUI {
    private candidatoService: CandidatoService;

    constructor() {
        this.candidatoService = new CandidatoService();

        const cadastrarButton = document.getElementById('cadastrar-candidato-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarCandidato();
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            this.listarCandidatos();
            const dadosCompetencias = this.obterContagemCompetencias();
            this.criarGraficoCompetencias(dadosCompetencias);
            this.associarEventosInformacoesCandidato();
        });
    }

    cadastrarCandidato(): void {
        const nomeInput = document.getElementById('nome') as HTMLInputElement;
        const emailInput = document.getElementById('email') as HTMLInputElement;
        const cepInput = document.getElementById('cep') as HTMLInputElement;
        const cpfInput = document.getElementById('cpf') as HTMLInputElement;
        const idadeInput = document.getElementById('idade') as HTMLInputElement;
        const estadoInput = document.getElementById('estado') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricao') as HTMLInputElement;

        const competencias: Competencia[] = this.obterCompetencias();
        const formacoes: Formacao[] = this.obterFormacoes(); 
        const experiencias: Experiencia[] = this.obterExperiencias();

        const novoCandidato = new Candidato(
            nomeInput.value,
            emailInput.value,
            cepInput.value,
            cpfInput.value,
            parseInt(idadeInput.value),
            estadoInput.value,
            descricaoInput.value,
            competencias,
            formacoes,
            experiencias
        );

        this.candidatoService.cadastrarCandidato(novoCandidato);

        nomeInput.value = '';
        emailInput.value = '';
        cepInput.value = '';
        cpfInput.value = '';
        idadeInput.value = '';
        estadoInput.value = '';
        descricaoInput.value = '';

       
        console.log(novoCandidato)
    }

    private obterFormacoes(): Formacao[] {
        const formacoes: Formacao[] = [];
        const listaFormacoes = document.getElementById('lista-formacoes') as HTMLUListElement;
    
        const itensFormacoes = listaFormacoes.querySelectorAll('li');
    
        itensFormacoes.forEach(item => {
            const textoFormacao = item.textContent || '';
            const partes = textoFormacao.split(' - ');
    
            if (partes.length === 4) {
                const curso = partes[0];
                const faculdade = partes[1];
                const nivelTexto = partes[2];
                
                // Mapeie o texto do nível para o enum NivelFormacao
                const nivel = NivelFormacao[nivelTexto as keyof typeof NivelFormacao] || NivelFormacao.Graduacao;
    
                const anoConclusao = parseInt(partes[3]); // Obtém o ano de conclusão
    
                const formacao = new Formacao(curso, faculdade, nivel, anoConclusao);
                formacoes.push(formacao);
            }
        });
    
        return formacoes;
    }
    
    
    private obterExperiencias(): Experiencia[] {
        const experiencias: Experiencia[] = [];
        const listaExperiencias = document.getElementById('lista-experiencias') as HTMLUListElement;
    
        const itensExperiencias = listaExperiencias.querySelectorAll('li');
    
        itensExperiencias.forEach(item => {
            const textoExperiencia = item.textContent || '';
            const partes = textoExperiencia.split(' - ');
    
            if (partes.length === 3) {
                const cargo = partes[0];
                const empresa = partes[1];
    
                const nivelTexto = partes[2]; 
                const nivel = NivelExperiencia[nivelTexto as keyof typeof NivelExperiencia] || NivelExperiencia.Junior;
    
                const experiencia = new Experiencia(cargo, empresa, nivel);
                experiencias.push(experiencia);
            }
        });
    
        return experiencias;
    }
    
    
    

    private obterCompetencias(): Competencia[] {
        const competencias: Competencia[] = [];
        const listaCompetencias = document.getElementById('lista-competencias') as HTMLUListElement;
    
        const itensCompetencias = listaCompetencias.querySelectorAll('li');
    
        itensCompetencias.forEach(item => {
            const textoCompetencia = item.textContent || '';
            const partes = textoCompetencia.split(' - ');
    
            if (partes.length === 2) {
                const nome = partes[0];
                const nivelTexto = partes[1];
                
                // Mapeie o texto do nível para o enum NivelCompetencia
                const nivel = NivelCompetencia[nivelTexto as keyof typeof NivelCompetencia] || NivelCompetencia.Basico;
    
                const competencia = new Competencia(nome, nivel);
                competencias.push(competencia);
            }
        });
    
        return competencias;
    }
    

    listarCandidatos() {
        const candidatosInfo = this.candidatoService.listarCandidatosInfo();
        const listaCandidatos = document.getElementById('lista-candidatos') as HTMLUListElement;
    
        listaCandidatos.innerHTML = '';
    
        candidatosInfo.forEach((candidatoInfo, index) => { 
            const li = document.createElement('li');
            li.setAttribute("class", "candidato-item"); 
            li.setAttribute("data-index", index.toString()); 
            li.innerHTML = `
            <div class="informacoes-candidato hidden">
                <p class="formacao-candidato">Formação: ${candidatoInfo.formacoes.map(formacao => `${formacao.curso} - ${formacao.instituicao}`).join(', ')}</p>
                <p class="experiencia-candidato">Experiência: ${candidatoInfo.experiencias.map(experiencia => `${experiencia.cargo} - ${experiencia.empresa}`).join(', ')}</p>
            </div>
            <br>
            <strong>Descrição Pessoal:</strong> ${candidatoInfo.descricaoPessoal}<br>
            <strong>Competências:</strong> ${candidatoInfo.competencias.map(comp => `${comp.nome} - ${comp.nivel}`).join(', ')}
        `;
            listaCandidatos.appendChild(li);
        });
    }
    

    associarEventosInformacoesCandidato() {
        const listaCandidatos = document.getElementById("lista-candidatos");
        const candidatosInfos = this.candidatoService.listarCandidatosInfo(); 

        if (listaCandidatos) {
            listaCandidatos.addEventListener("mouseover", (event) => {
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
            });

            listaCandidatos.addEventListener("mouseout", (event) => {
                const candidatoItem = this.encontrarCandidatoItem(event.target as HTMLElement);
                if (candidatoItem) {
                    const informacoesCandidato = candidatoItem.querySelector(".informacoes-candidato");
                    if (informacoesCandidato) {
                        informacoesCandidato.classList.add("hidden");
                    }
                }
            });
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
    
        const labels = Object.keys(dadosCompetencias);
        const data = Object.values(dadosCompetencias);
    
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error("Canvas context not available.");
            return;
        }
    
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
