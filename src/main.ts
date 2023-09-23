import CandidatoUI from './UI/candidatoUI';
import EmpresaUI from './UI/empresaUI';
import './cadastro-candidato/adiciona-competencias';
import './cadastro-candidato/adicionar-vagas';
import './cadastro-candidato/login';
import CandidatoService from './service/candidatoService';
import EmpresaService from './service/empresaService';
import UsuarioService from './service/usuarioService';


const candidatoService = new CandidatoService();
const usuarioService = new UsuarioService();
const empresaService = new EmpresaService();

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
