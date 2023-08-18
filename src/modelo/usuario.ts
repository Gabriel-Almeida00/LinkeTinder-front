import tipoUsuario from "./enum/tipoUsuario";

class Usuario {
    nome: string;
    email: string;
    userType: tipoUsuario;
    
    constructor(nome: string, email:string, userType: tipoUsuario) {
        this.nome = nome;
        this.email = email;
        this.userType = userType;
    }
}

export default Usuario;