import './View/login';
import CandidatoUI from './Controler/candidatoUI';
import EmpresaUI from './Controler/empresaUI';
import CandidatoService from './service/CandidatoService';
import EmpresaService from './service/EmpresaService';
import UsuarioService from './service/usuarioService';
import CandidatoView from './View/Candidato/CandidatoView';
import EmpresaView from './View/Empresa/EmpresaView';

const candidatoService = new CandidatoService();
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();

const candidatoUI = new CandidatoUI(candidatoService, usuarioService);
const empresaUi = new EmpresaUI(empresaService, usuarioService);

const empresaView = new EmpresaView();
const candidatoView = new CandidatoView();

empresaUi.listarVagas();
empresaUi.associarEventosInformacoesVaga();


document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.listarCandidatos();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
    candidatoUI.associarEventosInformacoesCandidato();
});
