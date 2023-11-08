class FormacaoDTO {
     instituicaoFormacao: string;
     cursoFormacao: string;
     anoConclusaoFormacao: string;
     nivel: number

    constructor(instituicaoFormacao: string, cursoFormacao: string, anoConclusaoFormacao: string, nivel:number) {
        this.instituicaoFormacao = instituicaoFormacao;
        this.cursoFormacao = cursoFormacao;
        this.anoConclusaoFormacao = anoConclusaoFormacao;
        this.nivel = nivel
    }
}
export default FormacaoDTO