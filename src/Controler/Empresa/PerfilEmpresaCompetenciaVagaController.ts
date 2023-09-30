import EmpresaService from "../../service/EmpresaService";
import UsuarioService from "../../service/usuarioService";

class PerfilEmpresaCompetenciaVagaController{
    private empresaService: EmpresaService;
    private usuarioService: UsuarioService;

    constructor() {
        this.empresaService = new EmpresaService();
        this.usuarioService = new UsuarioService();

        document.addEventListener('DOMContentLoaded', () => {
            const competenciasButtons = document.querySelectorAll('.competencias-button');
        
            if (competenciasButtons) {
                competenciasButtons.forEach((button) => {
                    button.addEventListener('click', () => {
                        const vagaId = button.getAttribute('data-competencia-id');
                        console.log(vagaId)
                        const competenciasVagaContainer = document.getElementById(`competencias-vaga-container`);
                        console.log(competenciasVagaContainer)
                        if (competenciasVagaContainer) {
                            if (competenciasVagaContainer.style.display === 'none' || competenciasVagaContainer.style.display === '') {
                                competenciasVagaContainer.style.display = 'block';
                            } else {
                                competenciasVagaContainer.style.display = 'none';
                            }
                        }
                    });
                });
            }
        });
        
        
    }

    
}
export default PerfilEmpresaCompetenciaVagaController;