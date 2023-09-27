import Competencia from "../modelo/Competencia";

class CompetenciaService{
    private competencias: Competencia[] = [];

    constructor() {
        this.competencias.push(new Competencia('Java'));
        this.competencias.push(new Competencia('Python'));
        this.competencias.push(new Competencia('C#'));
    }

    adicionarCompetencia(nome: string): Competencia {
        const competencia = new Competencia(nome);
        this.competencias.push(competencia);
        return competencia;
    }

    obterCompetenciaPorId(idCompetencia: string): Competencia | undefined {
        return this.competencias.find(competencia => competencia.obterId() === idCompetencia);
    }

    listarCompetencias(): Competencia[] {
        return this.competencias;
    }

    removerCompetencia(idCompetencia: string): boolean {
        const index = this.competencias.findIndex(competencia => competencia.obterId() === idCompetencia);
        if (index !== -1) {
            this.competencias.splice(index, 1);
            return true;
        }
        return false;
    }
}
export default CompetenciaService