import './View/login';
import CandidatoUI from './Controler/candidatoUI';
import EmpresaUI from './Controler/empresaUI';
import CandidatoService from './service/CandidatoService';
import EmpresaService from './service/EmpresaService';
import UsuarioService from './service/UsuarioService';
import CandidatoView from './View/Candidato/CandidatoView';
import EmpresaView from './View/Empresa/EmpresaView';
import PerfilCandidatoCompetenciaController from './Controler/Candidato/PerfilCandidatoCompetenciaController';
import PerfilCandidatoCompetenciaView from './View/Candidato/PerfilCandidatoCompetenciaView';
import CandidatoCompetenciaService from './service/candidato/CandidatoCompetenciaService';
import Candidato from './modelo/Candidato';
import LocalStorage from './data/LocalStorage';

const localStorage = new LocalStorage<Candidato>('candidatos');

const candidatoService = new CandidatoService();
const candidatoCompetenciaService = new CandidatoCompetenciaService(localStorage)
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();

const candidatoUI = new CandidatoUI(candidatoService, usuarioService);
const empresaUi = new EmpresaUI(empresaService, usuarioService);

const empresaView = new EmpresaView();
const candidatoView = new CandidatoView();

const perfilCandidatoCompetenciaController = new PerfilCandidatoCompetenciaController(candidatoCompetenciaService, usuarioService)
const perfilCandidatoCompetenciaView = new PerfilCandidatoCompetenciaView(perfilCandidatoCompetenciaController )
perfilCandidatoCompetenciaView.exibirCompetenciasDoCandidato();

empresaUi.listarVagas();
empresaUi.associarEventosInformacoesVaga();


document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.listarCandidatos();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
    candidatoUI.associarEventosInformacoesCandidato();
});
