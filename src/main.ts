import CandidatoUI from './Controler/candidatoUI';
import EmpresaUI from './Controler/empresaUI';
import './View/adiciona-competencias';
import './View/adicionar-vagas';
import './View/login';
import CandidatoService from './service/CandidatoService';
import EmpresaService from './service/EmpresaService';
import UsuarioService from './service/usuarioService';
import PerfilCandidatoController from './Controler/Candidato/PerfilCandidatoController';
import PerfilCandidatoCompetenciaController from './Controler/Candidato/PerfilCandidatoCompetenciaController';
import PerfilCandidatoFormacaoController from './Controler/Candidato/PerfilCandidatoFormacaoController';
import PerfilCandidatoExperienciaController from './Controler/Candidato/PerfilCandidatoExperienciaController';
import PerfilEmpresaController from './Controler/Empresa/PerfilEmpresaController';
import PerfilEmpresaVagasController from './Controler/Empresa/PerfilEmpresaVagasController';


const candidatoService = new CandidatoService();
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();

const perfilEmpresaVgasController = new PerfilEmpresaVagasController();
perfilEmpresaVgasController.exibirVagasDaEmpresa();

const perfilEmpresaController = new PerfilEmpresaController();
perfilEmpresaController.exibirInformacoesEmpresaNoHTML();

const perfilCandidatoExperienciaController = new PerfilCandidatoExperienciaController();
perfilCandidatoExperienciaController.exibirExperienciaDoCandidato();

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


document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.listarCandidatos();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
    candidatoUI.associarEventosInformacoesCandidato();
});
