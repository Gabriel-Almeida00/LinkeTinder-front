import VagaInfo from "../modelo/dto/vagaInfo";
import Empresa from "../modelo/empresa";
import LocalStorageService from "./localStorageService";

class EmpresaService {
    private empresas: Empresa[] = []
    private localStorageService: LocalStorageService;

    constructor(){
        this.localStorageService = new LocalStorageService('empresas');
        this.carregarEmpresasDoLocalStorage();
    }

    listarVagasInfo(): VagaInfo[] {
        const vagasInfo: VagaInfo[] = [];
        this.empresas.forEach(empresa => {
            empresa.vagas.forEach(vaga => {
                const vagaInfo = new VagaInfo(
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

    private salvarEmpresasNoLocalStorage(): void {
        this.localStorageService.salvarDados(this.empresas);
    }

    private carregarEmpresasDoLocalStorage(): void{
        const empresas = this.localStorageService.carregarDados();
        if(empresas){
            this.empresas = empresas;
        }
    }
}

export default EmpresaService;