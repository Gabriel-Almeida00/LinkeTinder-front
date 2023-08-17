import './cadastro-candidato/adiciona-competencias';
import './cadastro-candidato/adicionar-vagas'
import CandidatoUI from './UI/candidatoUI';
import EmpresaUI from './UI/empresaUI';

const candidatoUI = new CandidatoUI();
const empresaUi = new EmpresaUI();

empresaUi.listarVagas();
candidatoUI.listarCandidatos();


document.addEventListener('DOMContentLoaded', () => {
    const dadosCompetencias = candidatoUI.obterContagemCompetencias();
    candidatoUI.criarGraficoCompetencias(dadosCompetencias);
});

