import CandidatoUI from './Controler/candidatoUI';
import EmpresaUI from './Controler/empresaUI';
import './View/adiciona-competencias';
import './View/adicionar-vagas';
import './View/login';
import CandidatoService from './service/CandidatoService';
import EmpresaService from './service/EmpresaService';
import UsuarioService from './service/usuarioService';
import PerfilCandidatoController from './Controler/PerfilCandidatoController';
import PerfilCandidatoCompetenciaController from './Controler/PerfilCandidatoCompetenciaController';
import PerfilCandidatoFormacaoController from './Controler/PerfilCandidatoFormacaoController';


const candidatoService = new CandidatoService();
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();
const perfilCandidatoFormacaoController = new PerfilCandidatoFormacaoController();
perfilCandidatoFormacaoController.exibirFormacoesDoCandidato();

const perfilCandidatoCompetenciaController = new PerfilCandidatoCompetenciaController();
perfilCandidatoCompetenciaController.exibirCompetenciasDoCandidato();

const perfilCandidatoController = new PerfilCandidatoController();
perfilCandidatoController.exibirInformacoesCandidatoNoHTML();

const candidatoUI = new CandidatoUI(candidatoService, usuarioService);
const empresaUi = new EmpresaUI(empresaService, usuarioService);

empresaUi.listarVagas();
empresaUi.associarEventosInformacoesVaga();
candidatoUI.listarCandidatos();

document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
    candidatoUI.associarEventosInformacoesCandidato();
});
