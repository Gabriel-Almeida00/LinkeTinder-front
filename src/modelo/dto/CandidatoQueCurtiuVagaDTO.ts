import CandidatoCompetencia from "../CandidatoCompetencia";

class CandidatoQueCurtiuVagaDTO{
     idCandidato: string;
     descricao: string;
     competencia: CandidatoCompetencia[];

    constructor(idCandidato: string, descricao: string, competencia: CandidatoCompetencia[]) {
        this.idCandidato = idCandidato;
        this.descricao = descricao;
        this.competencia = competencia;
    }
}
export default CandidatoQueCurtiuVagaDTO