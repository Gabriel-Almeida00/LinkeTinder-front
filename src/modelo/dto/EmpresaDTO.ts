class EmpresaDTO{
    private id!: number;
    private pais: string;
    private descricaoEmpresa: string;

    constructor(pais: string, descricaoEmpresa: string) {
        this.pais = pais;
        this.descricaoEmpresa = descricaoEmpresa;
    }

    ObterId():number{
        return this.id
    }
}
export default EmpresaDTO;