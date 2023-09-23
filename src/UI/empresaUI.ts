import Empresa from "../modelo/empresa";
import EmpresaService from "../service/empresaService";
import Vaga from "../modelo/vaga";
import Competencia from "../modelo/competencia";
import NivelCompetencia from "../modelo/enum/nivelCompetencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";
import NivelExperiencia from "../modelo/enum/nivelExperiencia";
import UsuarioService from "../service/usuarioService";
import VagaDTO from "../modelo/dto/vagaDTO";


class EmpresaUI {
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;

    constructor(empresaService: EmpresaService, usuarioService: UsuarioService) {
        this.empresaService = empresaService;
        this.usuarioService = usuarioService;

        this.adicionarEventoCadastrar();
        this.adicionarEventoCarregarPagina();
    }

    private adicionarEventoCadastrar(): void {
        const cadastrarButton = document.getElementById('cadastrar-empresa-button');

        if (cadastrarButton) {
            cadastrarButton.addEventListener('click', () => {
                this.cadastrarEmpresa();
            });
        }
    }

    private adicionarEventoCarregarPagina(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.listarVagas();
        });
    }

    private validarCnpj(cnpj: string): boolean {
        const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
        return cnpjRegex.test(cnpj);
    }

    private validarNome(nome: string): boolean {
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        return nomeRegex.test(nome);
    }

    private validarEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    private validarCep(cep: string): boolean {
        const cepRegex = /^\d{5}-\d{3}$/;
        return cepRegex.test(cep);
    }

    private obterValoresDosCampos(): Empresa | null {
        const nomeInput = document.getElementById('nomeEmpresa') as HTMLInputElement;
        const emailInput = document.getElementById('emailEmpresa') as HTMLInputElement;
        const cepInput = document.getElementById('cepEmpresa') as HTMLInputElement;
        const cnpjInput = document.getElementById('cnpjEmpresa') as HTMLInputElement;
        const paisInput = document.getElementById('paisEmpresa') as HTMLInputElement;
        const estadoInput = document.getElementById('estadoEmpresa') as HTMLInputElement;
        const descricaoInput = document.getElementById('descricaoEmpresa') as HTMLInputElement;

        if (
            !this.validarCnpj(cnpjInput.value) ||
            !this.validarNome(nomeInput.value) ||
            !this.validarEmail(emailInput.value) ||
            !this.validarCep(cepInput.value)
        ) {
            alert('Por favor, preencha os campos corretamente.');
            return null;
        }

        const vagas: Vaga[] = this.obterVagas();

        return new Empresa(
            nomeInput.value,
            emailInput.value,
            cepInput.value,
            cnpjInput.value,
            paisInput.value,
            estadoInput.value,
            descricaoInput.value,
            vagas
        );
    }

    private limparCamposDoFormulario(): void {
        const camposParaLimpar = ['nomeEmpresa', 'emailEmpresa', 'cepEmpresa', 'cnpjEmpresa', 'paisEmpresa', 'estadoEmpresa', 'descricaoEmpresa'];

        camposParaLimpar.forEach((campo) => {
            const elemento = document.getElementById(campo) as HTMLInputElement;
            elemento.value = '';
        });
    }

    public cadastrarEmpresa(): void {
        const novaEmpresa = this.obterValoresDosCampos();

        if (novaEmpresa) {
            this.empresaService.cadastrarEmpresa(novaEmpresa);
            this.limparCamposDoFormulario();
            window.location.href = '../../paginas/login/login.html';
        }
    }


    private obterVagas(): Vaga[] {
        const vagas: Vaga[] = [];
        const listaVagas = document.getElementById('lista-vagas') as HTMLUListElement;
        const itensVagas = listaVagas.querySelectorAll('li');
    
        itensVagas.forEach(item => {
            const vaga = this.parseItemParaVaga(item);
            if (vaga) {
                vagas.push(vaga);
            }
        });
    
        return vagas;
    }
    
    private parseItemParaVaga(item: HTMLElement): Vaga | null {
        const partes = item.innerHTML.split("<br>");
    
        if (partes.length < 5) {
            return null;
        }
    
        const nome = this.extractTextFromHtml(partes[0]);
        const descricao = this.extractTextFromHtml(partes[1]);
        const competenciasTexto = this.extractTextFromHtml(partes[2]).replace("Competências: ", "");
        const competencias = this.parseCompetencias(competenciasTexto);
        const nivelExperienciaTexto = this.extractTextFromHtml(partes[3]).replace("Nível de Experiência: ", "");
        const nivelFormacaoTexto = this.extractTextFromHtml(partes[4]).replace("Nível de Formação: ", "");
    
        const nivelExperiencia = nivelExperienciaTexto.trim() as NivelExperiencia;
        const nivelFormacao = nivelFormacaoTexto.trim() as NivelFormacao;
    
        return new Vaga(nome, descricao, competencias, nivelFormacao, nivelExperiencia);
    }
    
    private parseCompetencias(competenciasTexto: string): Competencia[] {
        const competencias: Competencia[] = [];
        const competenciasPartes = competenciasTexto.split(", ");
    
        competenciasPartes.forEach(competenciaTexto => {
            const partesCompetencia = competenciaTexto.split(" - ");
            if (partesCompetencia.length === 2) {
                const nomeCompetencia = partesCompetencia[0];
                const nivelCompetenciaTexto = partesCompetencia[1].trim() as NivelCompetencia;
                competencias.push(new Competencia(nomeCompetencia, nivelCompetenciaTexto));
            }
        });
    
        return competencias;
    }
    
    private extractTextFromHtml(html: string): string {
        return html.replace(/<[^>]*>/g, "").trim();
    }
    

    listarVagas(): void {
        const vagas = this.empresaService.listarVagasDTO();
        const listaVagas = document.getElementById('vagas') as HTMLUListElement;
    
        listaVagas.innerHTML = '';
    
        vagas.forEach((vaga, index) => {
            const li = this.criarElementoVaga(vaga, index);
            listaVagas.appendChild(li);
        });
    }
    
    private criarElementoVaga(vaga: VagaDTO, index: number): HTMLElement {
        const li = document.createElement('li');
        li.setAttribute("class", "vaga-item");
        li.setAttribute("data-index", index.toString());
    
        const competenciasTexto = this.formatarCompetencias(vaga.requisitos);
    
        const afinidade = this.empresaService.calcularAfinidadeVagaComCandidato(vaga);
    
        li.innerHTML = `
            <div class="informacoes-vaga hidden">
                <p class="formacao-vaga">Formação Mínima: ${vaga.formacaoMinima}</p>
                <p class="experiencia-vaga">Experiência Mínima: ${vaga.experienciaMinima}</p>
            </div><br>
            <strong>${vaga.nome}</strong><br>${vaga.descricao}<br>Competências: ${competenciasTexto}
            <br>Afinidade: ${afinidade.toFixed(2)}%
        `;
    
        return li;
    }
    
    private formatarCompetencias(competencias: Competencia[]): string {
        return competencias.map(comp => `${comp.nome} - ${comp.nivel}`).join(", ");
    }
    


    associarEventosInformacoesVaga() {
        const listaVagas = document.getElementById("vagas");
        const vagasInfos = this.empresaService.listarVagasDTO();
    
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

export default EmpresaUI;
