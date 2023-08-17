import Candidato from "../modelo/candidato";
import CandidatoService from "../service/candidatoService";
import Competencia from "../modelo/competencia";
import NivelCompetencia from "../modelo/nivelCompetencia";
import Chart from 'chart.js/auto';


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

        const novoCandidato = new Candidato(
            nomeInput.value,
            emailInput.value,
            cepInput.value,
            cpfInput.value,
            parseInt(idadeInput.value),
            estadoInput.value,
            descricaoInput.value,
            competencias
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
    
        candidatosInfo.forEach(candidatoInfo => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Descrição Pessoal:</strong> ${candidatoInfo.descricaoPessoal}<br>
                <strong>Competências:</strong> ${candidatoInfo.competencias.map(comp => `${comp.nome} - ${comp.nivel}`).join(', ')}
            `;
            listaCandidatos.appendChild(li);
        });
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
