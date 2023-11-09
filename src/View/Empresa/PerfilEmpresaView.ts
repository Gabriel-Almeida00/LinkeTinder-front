import PerfilEmpresaController from "../../Controler/Empresa/PerfilEmpresaController";

class PerfilEmpresaView {
    controller: PerfilEmpresaController

    constructor() {
        this.controller = new PerfilEmpresaController

        const salvarButton = document.getElementById('atualizar-empresa-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.salvarInformacoesEmpresa();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            nome: document.getElementById('empresaNome') as HTMLInputElement,
            email: document.getElementById('empresaEmail') as HTMLInputElement,
            pais: document.getElementById('empresaPais') as HTMLInputElement,
            cep: document.getElementById('empresaCep') as HTMLInputElement,
            cnpj: document.getElementById('empresaCnpj') as HTMLInputElement,
            senha: document.getElementById('empresaSenha') as HTMLInputElement,
            descricao: document.getElementById('empresaDescricao') as HTMLInputElement
        };



        const empresa = {
            nome: elements.nome.value,
            email: elements.email.value,
            pais: elements.pais.value,
            cep: elements.cep.value,
            cnpj: elements.cnpj.value,
            descricao: elements.descricao.value,
            senha: elements.senha.value
        };

        return empresa;
    }

    setElementValueById(id: string, value: string | null) {
        const element = document.getElementById(id);
        if (element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement) {
            if (element instanceof HTMLInputElement) {
                element.value = value || '';
            } else if (element instanceof HTMLTextAreaElement) {
                element.textContent = value || '';
            }
        }
    }


    async exibirInformacoesEmpresaNoHTML() {
        const empresa = await this.controller.exibirInformacoesEmpresaNoHTML()
        if(empresa){
            this.setElementValueById('empresaNome', empresa.nome)
            this.setElementValueById('empresaEmail', empresa.email)
            this.setElementValueById('empresaPais', empresa.pais)
            this.setElementValueById('empresaCep', empresa.cep)
            this.setElementValueById('empresaCnpj', empresa.cnpj)
            this.setElementValueById('empresaSenha', empresa.senha)
            this.setElementValueById('empresaDescricao', empresa.descricao)
        } else{
            console.log("deu ruim")
        }
    }

    async salvarInformacoesEmpresa() {
        try {
            const empresaExistente = await this.controller.exibirInformacoesEmpresaNoHTML();
            const empresaAtualizada = this.pegarValoresDoFormulario()

            empresaExistente.nome = empresaAtualizada.nome;
            empresaExistente.email = empresaAtualizada.email;
            empresaExistente.pais = empresaAtualizada.pais;
            empresaExistente.cep = empresaAtualizada.cep;
            empresaExistente.cnpj = empresaAtualizada.cnpj;
            empresaExistente.senha = empresaAtualizada.senha;
            empresaExistente.descricao = empresaAtualizada.descricao;

            this.controller.salvarInformacoesEmpresa(empresaExistente);
        } catch (error) {
            console.error('Erro ao salvar informações da empresa:', error);
        }
    }
}
export default PerfilEmpresaView;