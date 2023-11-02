import { v4 as uuidv4 } from 'uuid';
import TipoUsuario from './enum/TipoUsuario';


class Pessoa {
     id!: number;
     nome: string;
     email: string;
     pais: string;
     cep: string;
     descricao: string;
     senha: string;
     tipoUsuario: TipoUsuario

    constructor(
        nome: string,
        email: string,
        pais: string,
        cep: string,
        descricao: string,
        senha: string,
        tipoUsuario: TipoUsuario
    ) {
    
        this.nome = nome;
        this.email = email;
        this.pais = pais;
        this.cep = cep;
        this.descricao = descricao;
        this.senha = senha;
        this.tipoUsuario = tipoUsuario
    }
}
export default Pessoa;


