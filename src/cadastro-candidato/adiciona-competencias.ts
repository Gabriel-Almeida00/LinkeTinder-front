import NivelCompetencia from "../modelo/enum/nivelCompetencia";
import NivelFormacao from "../modelo/enum/nivelFormacao";
import NivelExperiencia from "../modelo/enum/nivelExperiencia";

const adicionarCompetenciaButton = document.getElementById('adicionar-competencia');
const listaCompetencias = document.getElementById('lista-competencias');

const adicionarFormacaoButton = document.getElementById('adicionar-formacao');
const listaFormacoes = document.getElementById('lista-formacoes');

const adicionarExperienciaButton = document.getElementById('adicionar-experiencia');
const listaExperiencias = document.getElementById('lista-experiencias');

if (adicionarCompetenciaButton && listaCompetencias) {
    adicionarCompetenciaButton.addEventListener('click', () => {
        const nomeCompetenciaInput = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivelCompetenciaSelect = document.getElementById('nivelCompetencia') as HTMLSelectElement;

        const nomeCompetencia = nomeCompetenciaInput.value;
        const nivelCompetencia = nivelCompetenciaSelect.value as NivelCompetencia; 

        if (nomeCompetencia && nivelCompetencia) {
            const novaCompetencia = document.createElement('li');
            novaCompetencia.textContent = `${nomeCompetencia} - ${nivelCompetencia}`;
            listaCompetencias.appendChild(novaCompetencia);

            nomeCompetenciaInput.value = '';
            nivelCompetenciaSelect.value = nivelCompetencia; 
        }
    });
}

if (adicionarFormacaoButton && listaFormacoes) {
    adicionarFormacaoButton.addEventListener('click', () => {
        const instituicaoFormacaoInput = document.getElementById('instituicaoFormacao') as HTMLInputElement;
        const cursoFormacaoInput = document.getElementById('cursoFormacao') as HTMLInputElement;
        const nivelFormacaoSelect = document.getElementById('nivelFormacao') as HTMLSelectElement;
        const anoConclusaoFormacaoInput = document.getElementById('anoConclusaoFormacao') as HTMLInputElement;

        const instituicaoFormacao = instituicaoFormacaoInput.value;
        const cursoFormacao = cursoFormacaoInput.value;
        const nivelFormacao = nivelFormacaoSelect.value as NivelFormacao; // Use o enum NivelFormacao
        const anoConclusaoFormacao = parseInt(anoConclusaoFormacaoInput.value);

        if (instituicaoFormacao && cursoFormacao && nivelFormacao && !isNaN(anoConclusaoFormacao)) {
            const novaFormacao = document.createElement('li');
            novaFormacao.textContent = `${cursoFormacao} - ${instituicaoFormacao} - ${nivelFormacao} - ${anoConclusaoFormacao}`;
            listaFormacoes.appendChild(novaFormacao);

            instituicaoFormacaoInput.value = '';
            cursoFormacaoInput.value = '';
            nivelFormacaoSelect.value = nivelFormacao; // Defina o valor padrão diretamente usando a variável nivelFormacao
            anoConclusaoFormacaoInput.value = '';
        }
    });
}

if (adicionarExperienciaButton && listaExperiencias) {
    adicionarExperienciaButton.addEventListener('click', () => {
        const cargoExperienciaInput = document.getElementById('cargoExperiencia') as HTMLInputElement;
        const empresaExperienciaInput = document.getElementById('empresaExperiencia') as HTMLInputElement;
        const nivelExperienciaSelect = document.getElementById('nivelExperiencia') as HTMLSelectElement;

        const cargoExperiencia = cargoExperienciaInput.value;
        const empresaExperiencia = empresaExperienciaInput.value;
        const nivelExperiencia = nivelExperienciaSelect.value as NivelExperiencia; // Use o enum NivelExperiencia

        if (cargoExperiencia && empresaExperiencia && nivelExperiencia) {
            const novaExperiencia = document.createElement('li');
            novaExperiencia.textContent = `${cargoExperiencia} - ${empresaExperiencia} - ${nivelExperiencia}`;
            listaExperiencias.appendChild(novaExperiencia);

            cargoExperienciaInput.value = '';
            empresaExperienciaInput.value = '';
            nivelExperienciaSelect.value = nivelExperiencia; // Defina o valor padrão diretamente usando a variável nivelExperiencia
        }
    });
}