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
            vaga.nome,
            vaga.descricao,
            vaga.experienciaMinima,
            vaga.formacaoMinima,
            vaga.requisitos
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

   

    calcularAfinidadeVagaComCandidato(vaga: VagaDTO): number {
        const candidatoLogado = this.usuarioService.obterCandidatoLogado();
    
        if (!candidatoLogado) {
            return 0;
        }
    
        const afinidadeCompetencias = this.calcularAfinidadeCompetencias(vaga, candidatoLogado);
        const afinidadeExperiencia = this.calcularAfinidadeExperiencia(vaga, candidatoLogado);
        const afinidadeFormacao = this.calcularAfinidadeFormacao(vaga, candidatoLogado);
    
        const maxAfinidade = (3 * vaga.requisitos.length) + 3 + 3;
        const afinidadeTotal = afinidadeCompetencias + afinidadeExperiencia + afinidadeFormacao;
        const afinidadePercentual = (afinidadeTotal / maxAfinidade) * 100;
    
        return afinidadePercentual;
    }
    
    private calcularAfinidadeCompetencias(vaga: VagaDTO, candidato: Candidato): number {
        let afinidade = 0;
    
        vaga.requisitos.forEach(requisito => {
            const competenciaCandidato = candidato.competencias.find(competencia => competencia.nome === requisito.nome);
            if (competenciaCandidato && competenciaCandidato.nivel === requisito.nivel) {
                afinidade += 3;
            }
        });
    
        return afinidade;
    }
    
    private calcularAfinidadeExperiencia(vaga: VagaDTO, candidato: Candidato): number {
        const experienciaCandidato = candidato.experiencias.find(experiencia => experiencia.nivel === vaga.experienciaMinima);
        return experienciaCandidato ? 3 : 0;
    }
    
    private calcularAfinidadeFormacao(vaga: VagaDTO, candidato: Candidato): number {
        const formacaoCandidato = candidato.formacoes.find(formacao => formacao.nivel === vaga.formacaoMinima);
        return formacaoCandidato ? 3 : 0;
    }
    
}

export default EmpresaService;