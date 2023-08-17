class localStorageService{
    private key: string;

    constructor(key: string) {
        this.key = key;
    }

    salvarDados(dados: any): void {
        localStorage.setItem(this.key, JSON.stringify(dados));
    }

    carregarDados(): any {
        const dadosJSON = localStorage.getItem(this.key);
        if (dadosJSON) {
            return JSON.parse(dadosJSON);
        }
        return null;
    }
}

export default localStorageService;
