import VagaDTO from "../modelo/dto/vagaDTO";
import Empresa from "../modelo/empresa";
import LocalStorageService from "./localStorageService";
import usuarioService from "./usuarioService";

class EmpresaService {
    private empresas: Empresa[] = []
    private localStorageService: LocalStorageService;
    usuarioService: usuarioService;

    constructor(){
        this.localStorageService = new LocalStorageService('empresas');
        this.usuarioService = new usuarioService();
        this.carregarEmpresasDoLocalStorage();
       
    }

    private salvarEmpresasNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.empresas);
    }

    private carregarEmpresasDoLocalStorage(): void{
        const empresas = this.localStorageService.carregarDados();
        if(empresas){
            this.empresas = empresas;
        }
    }

    listarVagasDTO(): VagaDTO[] {
        const vagasInfo: VagaDTO[] = [];
        this.empresas.forEach(empresa => {
            empresa.vagas.forEach(vaga => {
                const vagaInfo = new VagaDTO(
                    vaga.nome,
                    vaga.descricao,
                    vaga.experienciaMinima,
                    vaga.formacaoMinima,
                    vaga.requisitos 
                );
                vagasInfo.push(vagaInfo);
            });
        });
        return vagasInfo;
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

      
        let afinidade = 0;

        vaga.requisitos.forEach(requisito => {
            const competenciaCandidato = candidatoLogado.competencias.find(competencia => competencia.nome === requisito.nome);
            if (competenciaCandidato && competenciaCandidato.nivel === requisito.nivel) {
                afinidade += 3; 
            }
        });

        const experienciaCandiato = candidatoLogado.experiencias[0].nivel;
        if (vaga.experienciaMinima === experienciaCandiato) {
            afinidade += 3;
        }

        const formacaoCandidato = candidatoLogado.formacoes[0].nivel;
        if (vaga.formacaoMinima === formacaoCandidato) {
            afinidade += 3;
        }

       
        const maxAfinidade = (3 * vaga.requisitos.length) + 3 + 3; 
        const afinidadePercentual = (afinidade / maxAfinidade) * 100;

        return afinidadePercentual;
    }
}

export default EmpresaService;