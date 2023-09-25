import TipoUsuario from "./enum/tipoUsuario";

class Usuario {
    private id!: number;
    nome: string;
    email: string;
    userType: TipoUsuario;
    
    constructor(id:number ,nome: string, email:string, userType: TipoUsuario) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.userType = userType;
    }

    obterId(): number{
        return this.id
       }
}

export default Usuario;