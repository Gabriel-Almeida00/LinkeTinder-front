class ExperienciaDTO {
     cargoExperiencia: string;
     empresaExperiencia: string;
     nivel: number

    constructor(cargoExperiencia: string, empresaExperiencia: string, nivel: number) {
        this.cargoExperiencia = cargoExperiencia;
        this.empresaExperiencia = empresaExperiencia;
        this.nivel = nivel
    }
}
export default ExperienciaDTO