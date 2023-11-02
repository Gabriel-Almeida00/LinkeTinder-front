import CandidatoController from "../../Controler/Candidato/CandidatoController";

class CandidatoView {
    private controller: CandidatoController

    constructor(controller: CandidatoController) {
        this.controller = controller;
        this.configurarEventListeners();
    }

    private configurarEventListeners() {
        const salvarButton = document.getElementById('salvar-button');
        if (salvarButton) {
            salvarButton.addEventListener('click', () => {
                this.salvarInformacoesCandidato();
            });
        }
    }

    pegarValoresDoFormulario() {
        const elements = {
            nome: document.getElementById('nomeCandidato') as HTMLInputElement,
            sobrenome: document.getElementById('sobrenomeCandidato') as HTMLInputElement,
            dataNascimento: document.getElementById('dataNascimentoCandidato') as HTMLInputElement,
            email: document.getElementById('emailCandidato') as HTMLInputElement,
            pais: document.getElementById('paisCandidato') as HTMLInputElement,
            cep: document.getElementById('cepCandidato') as HTMLInputElement,
            cpf: document.getElementById('cpfCandidato') as HTMLInputElement,
            redeSocial: document.getElementById('linkedinCandidato') as HTMLInputElement,
            descricao: document.getElementById('descricaoCandidato') as HTMLTextAreaElement,
            telefone: document.getElementById('telefoneCandidato') as HTMLInputElement,
            senha: document.getElementById('senhaCandidato') as HTMLInputElement
        };

        const dataNascimentoHTMl = elements.dataNascimento.value
        const data = new Date(dataNascimentoHTMl);

        const candidato = {
            nome: elements.nome.value,
            sobrenome: elements.sobrenome.value,
            dataNascimento: data,
            email: elements.email.value,
            pais: elements.pais.value,
            cep: elements.cep.value,
            cpf: elements.cpf.value,
            redeSocial: elements.redeSocial.value,
            descricao: elements.descricao.value,
            telefone: elements.telefone.value,
            senha: elements.senha.value
        };

        return candidato;
    }



    setElementValueById(id: string, value: string | null) {
        const element = document.getElementById(id);
        if (element instanceof HTMLInputElement) {
            element.value = value || '';
        }
    }

    formatAndSetDateElementValue(id: string, date: Date | null) {
        const element = document.getElementById(id);
        if (element instanceof HTMLInputElement && date) {
            const formattedDate = date.toISOString().split('T')[0];
            element.value = formattedDate;
        }
    }



    async exibirInformacoesCandidatoNoHTML() {
        const candidato = await this.controller.pegarInformacoesDoCandidato();

        if (candidato) {
            this.setElementValueById('nomeCandidato', candidato.nome);
            this.setElementValueById('sobrenomeCandidato', candidato.sobrenome);
            this.formatAndSetDateElementValue('dataNascimentoCandidato', new Date(candidato.dataNascimento));
            this.setElementValueById('emailCandidato', candidato.email);
            this.setElementValueById('paisCandidato', candidato.pais);
            this.setElementValueById('cepCandidato', candidato.cep);
            this.setElementValueById('cpfCandidato', candidato.cpf);
            this.setElementValueById('linkedinCandidato', candidato.redeSocial);
            this.setElementValueById('descricaoCandidato', candidato.descricao);
            this.setElementValueById('telefoneCandidato', candidato.telefone);
            this.setElementValueById('senhaCandidato', candidato.senha);
        } else {
            console.log("não foi possível encontrar informações candidatos")
        }
    }

    async salvarInformacoesCandidato() {
        const candidato = await this.controller.pegarInformacoesDoCandidato();
        const candidatoAtualizado = this.pegarValoresDoFormulario();

        if(candidato){
            candidato.nome = candidatoAtualizado.nome;
            candidato.sobrenome = candidatoAtualizado.sobrenome;
            candidato.dataNascimento = candidatoAtualizado.dataNascimento;
            candidato.email = candidatoAtualizado.email;
            candidato.pais = candidatoAtualizado.pais;
            candidato.cep = candidatoAtualizado.cep;
            candidato.cpf = candidatoAtualizado.cpf;
            candidato.redeSocial = candidatoAtualizado.redeSocial;
            candidato.descricao = candidatoAtualizado.descricao;
            candidato.telefone = candidatoAtualizado.telefone;
            candidato.senha = candidatoAtualizado.senha;

            this.controller.atualizarInformacoesCandidato(candidato);
        }
    }

} export default CandidatoView;