import CandidatoCompetencia from "../CandidatoCompetencia";

class CandidatoQueCurtiuVagaDTO{
    private idCandidato: number;
    private descricao: string;
    private competencia: CandidatoCompetencia[];

    constructor(idCandidato: number, descricao: string, competencia: CandidatoCompetencia[]) {
        this.idCandidato = idCandidato;
        this.descricao = descricao;
        this.competencia = competencia;
    }
}
export default CandidatoQueCurtiuVagaDTO