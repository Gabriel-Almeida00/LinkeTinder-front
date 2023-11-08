import ExperienciaDTO from "./ExperienciaDTO";
import FormacaoDTO from "./FormacaoDTO";
import CompetenciaCandidatoDTO from "./dto/CompetenciaCandidatoDTO";

class CandidatoDTO {
     id: number;
     nome: string;
     descricao: string;
     formacoes: FormacaoDTO[];
     experiencias: ExperienciaDTO[];
     competencias: CompetenciaCandidatoDTO[];

    constructor(id: number, nome: string, descricao: string, formacoes: FormacaoDTO[], experiencias: ExperienciaDTO[], competencias: CompetenciaCandidatoDTO[]) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.formacoes = formacoes;
        this.experiencias = experiencias;
        this.competencias = competencias;
    }
}
export default CandidatoDTO