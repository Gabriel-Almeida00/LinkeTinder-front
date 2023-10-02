class EmpresaDTO{
     id!: string;
     pais: string;
     descricaoEmpresa: string;

    constructor(pais: string, descricaoEmpresa: string) {
        this.pais = pais;
        this.descricaoEmpresa = descricaoEmpresa;
    }
}
export default EmpresaDTO;