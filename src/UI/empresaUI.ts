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
    
                        // Extrair o nível de competência corretamente
                        const nivelCompetencia = nivelCompetenciaTexto.trim() as NivelCompetencia;
    
                        return new Competencia(nomeCompetencia, nivelCompetencia);
                    } else {
                        return new Competencia("", NivelCompetencia.Basico);
                    }
                });
    
                // Extrair o nível de experiência e formação
                const nivelExperiencia = nivelExperienciaTexto.trim() as NivelExperiencia;
                const nivelFormacao = nivelFormacaoTexto.trim() as NivelFormacao;
    
                const vaga = new Vaga(nome, descricao, competencias,nivelFormacao, nivelExperiencia);
                vagas.push(vaga);
            }
        });
    
        return vagas;
    }
    
    
    
    
    
    listarVagas(): void {
        const vagas = this.empresaService.listarVagas();
        const listaVagas = document.getElementById('vagas') as HTMLUListElement;
    
        listaVagas.innerHTML = '';
    
        vagas.forEach(vaga => {
            const li = document.createElement('li');
    
            // Aqui, estamos mapeando cada competência para seu nome e nível
            const competenciasTexto = vaga.requisitos.map(comp => `${comp.nome} - ${comp.nivel}`).join(", ");
    
            li.innerHTML = `<strong>${vaga.nome}</strong><br>${vaga.descricao}<br>Competências: ${competenciasTexto}`;
            listaVagas.appendChild(li);
        });
    }

    
    
}

export default EmpresaUI;
