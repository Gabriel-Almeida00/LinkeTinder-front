interface ILocalStorage<T> {
    salvarDados(dados: T[]): void;
    carregarDados(): T[];
}
export default ILocalStorage;
