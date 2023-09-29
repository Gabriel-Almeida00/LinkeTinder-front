import VagaDTO from "../modelo/dto/VagaDTO";
import Vaga from "../modelo/Vaga";
import Empresa from "../modelo/Empresa";
import Candidato from "../modelo/Candidato";

import LocalStorageService from "./localStorageService";
import UsuarioService from "./usuarioService";

class EmpresaService {
    private empresas: Empresa[] = []
    private localStorageService: LocalStorageService<Empresa>;
    usuarioService: UsuarioService;

    constructor(){
        this.localStorageService = new LocalStorageService<Empresa>('empresas');
        this.usuarioService = new UsuarioService();
        this.carregarEmpresasDoLocalStorage();
       
    }

    private salvarEmpresasNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.empresas);
    }

    private carregarEmpresasDoLocalStorage(): void{
        const empresas = this.localStorageService.carregarDados();
        if(empresas.length > 0 ){
            this.empresas = empresas;
        }
    }

    private converterVagaParaDTO(vaga: Vaga): VagaDTO {
        return new VagaDTO(
            vaga.obterId(),
            vaga.getNome(),
            vaga.getDescricao(),
            vaga.getFormacao(),
            vaga.getExperiencia(),
            vaga.getCompetencias()
        );
    }
    
    listarVagasDTO(): VagaDTO[] {
        const vagas: VagaDTO[] = [];
    
        this.empresas.forEach(empresa => {
            empresa.vagas.forEach(vaga => {
                const vagaDTO = this.converterVagaParaDTO(vaga);
                vagas.push(vagaDTO);
            });
        });
    
        return vagas;
    }
    
    cadastrarEmpresa(empresa: Empresa):void {
        this.empresas.push(empresa);
        this.salvarEmpresasNoLocalStorage();
    }

    atualizarEmpresaNoLocalStorage(empresaAtualizada: Empresa): void {
        const empresas = this.localStorageService.BuscarEmpresaNoLocalStorage();
        const indice = empresas.findIndex((empresa) => empresa.id === empresaAtualizada.id);
    
        if (indice !== -1) {
            empresas[indice] = empresaAtualizada;
            this.localStorageService.salvarDados(empresas);
        }
    }

   

    calcularAfinidadeVagaComCandidato(vaga: VagaDTO): number {
        const idCandidato = this.usuarioService.obterIdUsuarioLogado()
        const candidatoLogado = this.usuarioService.obterCandidato(idCandidato);
    
        if (!candidatoLogado) {
            return 0;
        }
    
        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(vaga, candidatoLogado);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(vaga, candidatoLogado);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(vaga, candidatoLogado);
    
        const maxAfinidade = (3 * vaga.getVagas().length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;
    
        return afinidadePercentual;
    }
    
    private calcularAfinidadeCompetencias(vaga: VagaDTO, candidato: Candidato): number {
        let afinidade = 0;
    
        vaga.getVagas().forEach(requisito => {
            const competenciaCandidato = candidato.getCompetencias().find(
                competencia => competencia.getNivel() === requisito.getNivel());
            if (competenciaCandidato && competenciaCandidato.getNivel() === requisito.getNivel()) {
                afinidade += 3;
            }
        });
    
        return afinidade;
    }
    
    private calcularAfinidadeExperiencia(vaga: VagaDTO, candidato: Candidato): number {
        const experienciaCandidato = candidato.getExperiencias().find(
            experiencia => experiencia.getNivel() === vaga.getExperiencia());
        return experienciaCandidato ? 3 : 0;
    }
    
    private calcularAfinidadeFormacao(vaga: VagaDTO, candidato: Candidato): number {
        const formacaoCandidato = candidato.getFormacoes().find(
            formacao => formacao.getNivel() === vaga.getFormacao());
        return formacaoCandidato ? 3 : 0;
    }
    
}

export default EmpresaService;