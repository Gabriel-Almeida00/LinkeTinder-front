import Candidato from "../modelo/Candidato";

class LocalStorageService<T> {
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    salvarDados(dados: T[]): void {
        const dadosJSON = JSON.stringify(dados);
        localStorage.setItem(this.key, dadosJSON);
    }

    BuscarCandidatoNoLocalStorage(): Candidato[] | [] {
        const dadosJSON = localStorage.getItem(this.key);
        if (dadosJSON) {
            const dados = JSON.parse(dadosJSON) as Candidato[];
            return dados;
        }
        return [];
    }


    carregarDados(): T[] | [] {
        const dadosJSON = localStorage.getItem(this.key);
        if (dadosJSON) {
            return JSON.parse(dadosJSON) as T[];
        }
        return [];
    }
}

export default LocalStorageService;
