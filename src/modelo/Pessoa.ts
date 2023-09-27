import { v4 as uuidv4 } from 'uuid';
import TipoUsuario from './enum/tipoUsuario';


class Pessoa {
     id: string;
    private nome: string;
    private email: string;
    private pais: string;
    private cep: string;
    private descricao: string;
    private senha: string;
    private tipoUsuario: TipoUsuario

    constructor(
        nome: string,
        email: string,
        pais: string,
        cep: string,
        descricao: string,
        senha: string,
        tipoUsuario: TipoUsuario
    ) {
        this.id = uuidv4();
        this.nome = nome;
        this.email = email;
        this.pais = pais;
        this.cep = cep;
        this.descricao = descricao;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario
    }

    setId(id: string): void {
        this.id = id;
    }

    obterId(): string {
        return this.id
    }

    getNome(): string {
        return this.nome
    }

    getEmail(): string {
        return this.email
    }

    getPais(): string{
        return this.pais
    }

    getCep(): string{
        return this.cep
    }

  

    getDescricao(): string {
        return this.descricao
    }

    getSenha(): string {
        return this.senha
    }
}
export default Pessoa;


