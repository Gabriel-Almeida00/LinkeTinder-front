import './View/login';
import './api/competencia/competenciaApi'
import CandidatoUI from './Controler/candidatoUI';
import EmpresaUI from './Controler/empresaUI';
import CandidatoService from './service/candidato/CandidatoService';
import EmpresaService from './service/EmpresaService';
import UsuarioService from './service/usuario/UsuarioService';
import EmpresaView from './View/Empresa/View';
import PerfilCandidatoCompetenciaController from './Controler/Candidato/CandidatoCompetenciaController';
import PerfilCandidatoCompetenciaView from './View/Candidato/CandidatoCompetenciaView';
import CandidatoCompetenciaService from './service/candidato/CandidatoCompetenciaService';
import Candidato from './modelo/Candidato';
import LocalStorage from './data/LocalStorage';
import CandidatoView from './View/Candidato/CandidatoView';
import CandidatoController from './Controler/Candidato/CandidatoController';
import CandidatoExperienciaView from './View/Candidato/CandidatoExperienciaView';
import PerfilCandidatoExperienciaController from './Controler/Candidato/CandidatoExperienciaController';
import ExperienciaService from './service/ExperienciaService';
import CandidatoFormacaoView from './View/Candidato/CandidatoFormacaoView';
import CandidatoFormacaoController from './Controler/Candidato/CandidatoFormacaoController';
import FormacaoService from './service/FormacaoService';
import VagaCompetenciaView from './View/Empresa/VagaCompetenciaView';
import VagaCompetenciaController from './Controler/Empresa/VagaCompetenciaController';

const localStorage = new LocalStorage<Candidato>('candidatos');

const candidatoService = new CandidatoService(localStorage);
const candidatoCompetenciaService = new CandidatoCompetenciaService(localStorage)
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();
const experienciaService = new ExperienciaService()
const formacaoService = new FormacaoService();

const candidatoUI = new CandidatoUI(candidatoService, usuarioService);
const empresaUi = new EmpresaUI(empresaService, usuarioService);

const empresaView = new EmpresaView();


const controller = new CandidatoFormacaoController(usuarioService, formacaoService)
const candidatoFormacaoVew = new CandidatoFormacaoView(controller)
candidatoFormacaoVew.exibirFormacoesDoCandidato();

const candidatoExperienciaController = new PerfilCandidatoExperienciaController(usuarioService, experienciaService);
const candidatoExperienciaView = new CandidatoExperienciaView(candidatoExperienciaController);
candidatoExperienciaView.exibirExperienciaDoCandidato();

const candidatoController = new CandidatoController(candidatoService, usuarioService);
const candidatoView = new CandidatoView(candidatoController);
candidatoView.exibirInformacoesCandidatoNoHTML();

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
