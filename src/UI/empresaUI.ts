import Empresa from "../modelo/empresa";
import EmpresaService from "../service/empresaService";
import Vaga from "../modelo/vaga";
import Competencia from "../modelo/competencia";
import NivelCompetencia from "../modelo/enum/nivelCompetencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";
import NivelExperiencia from "../modelo/enum/nivelExperiencia";


class EmpresaUI {
    private empresaService: EmpresaService;

    constructor() {
        this.empresaService = new EmpresaService();

        const cadastrarButton = document.getElementById('cadastrar-empresa-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarEmpresa();
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            this.listarVagas();
        });
    }

    cadastrarEmpresa(): void {
        const nomeInput = document.getElementById('nomeEmpresa') as HTMLInputElement;
        const emailInput = document.getElementById('emailEmpresa') as HTMLInputElement;
        const cepInput = document.getElementById('cepEmpresa') as HTMLInputElement;
        const cnpjInput = document.getElementById('cnpjEmpresa') as HTMLInputElement;
        const paisInput = document.getElementById('paisEmpresa') as HTMLInputElement;
        const estadoInput = document.getElementById('estadoEmpresa') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricaoEmpresa') as HTMLInputElement;

        const vagas: Vaga[] = this.obterVagas();

        const novaEmpresa = new Empresa(
            nomeInput.value,
            emailInput.value,
            cepInput.value,
            cnpjInput.value,
            paisInput.value,
            estadoInput.value,
            descricaoInput.value,
            vagas
        );

        this.empresaService.cadastrarEmpresa(novaEmpresa);

        nomeInput.value = '';
        emailInput.value = '';
        cepInput.value = '';
        cnpjInput.value = '';
        paisInput.value = '';
        estadoInput.value = '';
        descricaoInput.value = '';

        console.log(novaEmpresa);
    }

    private obterVagas(): Vaga[] {
        const vagas: Vaga[] = [];
        const listaVagas = document.getElementById('lista-vagas') as HTMLUListElement;
        const itensVagas = listaVagas.querySelectorAll('li');
    
        itensVagas.forEach(item => {
            const partes = item.innerHTML.split("<br>");
            if (partes.length >= 4) {
                const nome = partes[0].replace("<strong>", "").replace("</strong>", "");
                const descricao = partes[1];
                const competenciasTexto = partes[2].replace("Competências: ", "");
                const competenciasPartes = competenciasTexto.split(", ");
                const nivelExperienciaTexto = partes[3].replace("Nível de Experiência: ", "");
                const nivelFormacaoTexto = partes[4].replace("Nível de Formação: ", "");
    
                const competencias: Competencia[] = competenciasPartes.map(competenciaTexto => {
                    const partesCompetencia = competenciaTexto.split(" - ");
                    if (partesCompetencia.length === 2) {
                        const nomeCompetencia = partesCompetencia[0];
                        const nivelCompetenciaTexto = partesCompetencia[1];
    
                  
                        const nivelCompetencia = nivelCompetenciaTexto.trim() as NivelCompetencia;
    
                        return new Competencia(nomeCompetencia, nivelCompetencia);
                    } else {
                        return new Competencia("", NivelCompetencia.Basico);
                    }
                });
    
                const nivelExperiencia = nivelExperienciaTexto.trim() as NivelExperiencia;
                const nivelFormacao = nivelFormacaoTexto.trim() as NivelFormacao;
    
                const vaga = new Vaga(nome, descricao, competencias,nivelFormacao, nivelExperiencia);
                vagas.push(vaga);
            }
        });
    
        return vagas;
    }
    
    
    listarVagas(): void {
        const vagas = this.empresaService.listarVagasInfo();
        const listaVagas = document.getElementById('vagas') as HTMLUListElement;
    
        listaVagas.innerHTML = '';
    
        vagas.forEach((vaga, index) => { 
            const li = document.createElement('li');
            li.setAttribute("class", "vaga-item"); 
            li.setAttribute("data-index", index.toString());
    
            const competenciasTexto = vaga.requisitos.map(comp => `${comp.nome} - ${comp.nivel}`).join(", ");
    
            li.innerHTML = `
                <div class="informacoes-vaga hidden">
                    <p class="formacao-vaga">Formação Mínima: ${vaga.formacaoMinima}</p>
                    <p class="experiencia-vaga">Experiência Mínima: ${vaga.experienciaMinima}</p>
                </div><br>
                <strong>${vaga.titulo}</strong><br>${vaga.descricao}<br>Competências: ${competenciasTexto}
            `;
    
            listaVagas.appendChild(li);
        });
    }
    

    associarEventosInformacoesVaga() {
        const listaVagas = document.getElementById("vagas");
        const vagasInfos = this.empresaService.listarVagasInfo(); 
    
        if (listaVagas) {
            listaVagas.addEventListener("mouseover", (event) => {
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
            });
    
            listaVagas.addEventListener("mouseout", (event) => {
                const vagaItem = this.encontrarVagaItem(event.target as HTMLElement);
                if (vagaItem) {
                    const informacoesVaga = vagaItem.querySelector(".informacoes-vaga");
                    if (informacoesVaga) {
                        informacoesVaga.classList.add("hidden");
                    }
                }
            });
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

export default EmpresaUI;
