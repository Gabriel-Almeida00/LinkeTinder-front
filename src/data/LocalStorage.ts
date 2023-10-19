import ILocalStorage from "./ILocalStorage";

class LocalStorage<T> implements ILocalStorage<T>{
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    salvarDados(dados: T[]): void {
        const dadosJSON = JSON.stringify(dados);
        localStorage.setItem(this.key, dadosJSON);
    }

    carregarDados(): T[] {
        const dadosJSON = localStorage.getItem(this.key);
        if (dadosJSON) {
            return JSON.parse(dadosJSON) as T[];
        }
        return [];
    }
}
export default LocalStorage;