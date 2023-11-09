import VagaDTO from "../../modelo/dto/VagaDTO";
import Vaga from "../../modelo/Vaga";
import Empresa from "../../modelo/Empresa";
import Candidato from "../../modelo/Candidato";


import VagaCompetencia from "../../modelo/VagaCompetencia";
import EmpresaApi from "../../api/empresa/empresaApi";
import CadastroAPi from "../../api/candidato/cadastroApi";

class EmpresaService {
    private api: EmpresaApi;
    private apiCadastro : CadastroAPi
    

    constructor() {
        this.api = new EmpresaApi();
        this.apiCadastro = new CadastroAPi()
    }


    async listarEmpresas(): Promise<Candidato[]> {
        const response = await this.api.listarEmpresas();
        return response.data;
    }

    async obterEmpresaPorId(idEmpresa: number): Promise<Empresa> {
        const response = await this.api.buscarEmpresaPorId(idEmpresa);
        return response.data;
    }


    async adicionarEmpresa(empresa: Empresa): Promise<void> {
        try {
            await this.apiCadastro.criarEmpresa(empresa);
        } catch (error) {
            console.error('Erro ao criar candidato:', error);
        }
    }

    async atualizarEmpresa(id: number, empresa: Empresa): Promise<boolean> {
        try {
            const response = await this.api.atualizarEmpresa(id, empresa)
            return true;
        } catch {
            return false;
        }
    }

    async excluirCandidato(idEmpresa: number): Promise<boolean> {
        try {
            await this.api.excluirEmpresa(idEmpresa);
            return true;
        } catch {
            return false;
        }
    }
}

export default EmpresaService;