import './cadastro-candidato/adiciona-competencias';
import './cadastro-candidato/adicionar-vagas'
import './cadastro-candidato/login'
import CandidatoUI from './UI/candidatoUI';
import EmpresaUI from './UI/empresaUI';

const candidatoUI = new CandidatoUI();
const empresaUi = new EmpresaUI();

empresaUi.listarVagas();
empresaUi.associarEventosInformacoesVaga();
candidatoUI.listarCandidatos();


document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
    candidatoUI.associarEventosInformacoesCandidato();
});

