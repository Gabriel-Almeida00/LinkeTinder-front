import TipoUsuario from "./enum/tipoUsuario";

class Usuario {
    nome: string;
    email: string;
    userType: TipoUsuario;
    
    constructor(nome: string, email:string, userType: TipoUsuario) {
        this.nome = nome;
        this.email = email;
        this.userType = userType;
    }
}

export default Usuario;