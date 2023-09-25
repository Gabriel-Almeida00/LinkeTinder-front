class Pessoa {
    private id!: number;
    private nome: string;
    private email: string;
    private pais: string;
    private cep: string;
    private descricao: string;
    private senha: string;

    constructor(
        nome: string,
        email: string,
        pais: string,
        cep: string,
        descricao: string,
        senha: string
    ) {
        this.nome = nome;
        this.email = email;
        this.pais = pais;
        this.cep = cep;
        this.descricao = descricao;
        this.senha = senha;
    }

    obterId(): number {
        return this.id
    }

    getNome(): string{
        return this.nome
    }

    getDescricao(): string {
        return this.descricao
    }
}
export default Pessoa;
