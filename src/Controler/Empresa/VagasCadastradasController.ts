import CompetenciaCandidatoDTO from "../../modelo/dto/CompetenciaCandidatoDTO";
import VagaDTO from "../../modelo/dto/VagaDTO";
import VagaService from "../../service/vaga/VagaService";

class VagasCadastradasController{
    private vagaService: VagaService

    constructor() {
        this.vagaService = new VagaService

        this.adicionarEventoCarregarPagina();
        this.associarEventosInformacoesVaga()
    }

    private adicionarEventoCarregarPagina(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.listarVagas();
        });
    }

    async listarVagas() {
        const vagas = await this.vagaService.listarVagas();
        const listaVagas = document.getElementById('vagas') as HTMLUListElement;
    
        listaVagas.innerHTML = '';
    
        vagas.forEach(async (vaga, index) => {
            const li = await this.criarElementoVaga(vaga, index);
            listaVagas.appendChild(li);
        });
    }
    
    private async criarElementoVaga(vaga: VagaDTO, index: number): Promise<HTMLElement> {
        const li = document.createElement('li');
        li.setAttribute("class", "vaga-item");
        li.setAttribute("data-index", index.toString());

        const competenciasTexto = this.formatarCompetencias(vaga.competencias);
    
        const afinidade = await this.vagaService.calcularAfinidadeVagaComCandidato(vaga);
    
        li.innerHTML = `
            <div class="informacoes-vaga hidden">
                <p class="formacao-vaga">Formação Mínima: ${vaga.formacao.nome}</p>
                <p class="experiencia-vaga">Experiência Mínima: ${vaga.experiencia.nome}</p>
            </div><br>
            <strong>${vaga.nome}</strong><br>${vaga.descricao}<br>Competências: ${competenciasTexto}
            <br>Afinidade: ${afinidade.toFixed(2)}%
        `;
    
        return li;
    }
    
    private formatarCompetencias(competencias: CompetenciaCandidatoDTO[]): string {
        return competencias.map(comp => `${comp.nivel} `).join(", ");
    }
    


    async associarEventosInformacoesVaga() {
        const listaVagas = document.getElementById("vagas");
        const vagasInfos = await this.vagaService.listarVagas();
    
        if (listaVagas) {
            listaVagas.addEventListener("mouseover", (event) => {
                this.mostrarInformacoesVaga(event, vagasInfos);
            });
    
            listaVagas.addEventListener("mouseout", (event) => {
                this.ocultarInformacoesVaga(event);
            });
        }
    }
    
    private mostrarInformacoesVaga(event: MouseEvent, vagasInfos: VagaDTO[]): void {
        const vagaItem = this.encontrarVagaItem(event.target as HTMLElement);
        if (vagaItem) {
            const index = parseInt(vagaItem.getAttribute("data-index") || "");
            const vagaInfo = vagasInfos[index];
    
            if (vagaInfo) {
                const informacoesVaga = vagaItem.querySelector(".informacoes-vaga");
                if (informacoesVaga) {
                    informacoesVaga.classList.remove("hidden");
                }
            }
        }
    }
    
    private ocultarInformacoesVaga(event: MouseEvent): void {
        const vagaItem = this.encontrarVagaItem(event.target as HTMLElement);
        if (vagaItem) {
            const informacoesVaga = vagaItem.querySelector(".informacoes-vaga");
            if (informacoesVaga) {
                informacoesVaga.classList.add("hidden");
            }
        }
    }


    encontrarVagaItem(element: HTMLElement | null): HTMLElement | null {
        while (element) {
            if (element.tagName === "LI") {
                return element;
            }
            element = element.parentElement;
        }
        return null;
    }

}
export default VagasCadastradasController