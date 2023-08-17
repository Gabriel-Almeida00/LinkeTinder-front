import NivelExperiencia from "./enum/nivelExperiencia";

class Experiencia {
    cargo: string;
    empresa: string;
    nivel: NivelExperiencia;

    constructor(cargo: string, empresa: string, nivel: NivelExperiencia) {
        this.cargo = cargo;
        this.empresa = empresa;
        this.nivel = nivel;
    }
}

export default Experiencia;