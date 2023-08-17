import Empresa from "../modelo/empresa";
import Vaga from "../modelo/vaga";
import localStorageService from "./localStorageService";

class EmpresaService {
    private empresas: Empresa[] = []
    private localStorageService: localStorageService;

    constructor(){
        this.localStorageService = new localStorageService('empresas');
        this.carregarEmpresasDoLocalStorage();
    }

    listarVagas(): Vaga[] {
        const vagas: Vaga[] = [];
        this.empresas.forEach(empresa => {
            vagas.push(...empresa.vagas);
        });
        return vagas;
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