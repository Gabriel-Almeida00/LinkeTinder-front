import NivelCompetencia from "../modelo/nivelCompetencia";

const adicionarCompetenciaButton = document.getElementById('adicionar-competencia');
const listaCompetencias = document.getElementById('lista-competencias');

if (adicionarCompetenciaButton && listaCompetencias) {
    adicionarCompetenciaButton.addEventListener('click', () => {
        const nomeCompetenciaInput = document.getElementById('nomeCompetencia') as HTMLInputElement;
        const nivelCompetenciaSelect = document.getElementById('nivelCompetencia') as HTMLSelectElement;

        const nomeCompetencia = nomeCompetenciaInput.value;
        const nivelCompetencia = nivelCompetenciaSelect.value as NivelCompetencia; // Use o enum NivelCompetencia

        if (nomeCompetencia && nivelCompetencia) {
            const novaCompetencia = document.createElement('li');
            novaCompetencia.textContent = `${nomeCompetencia} - ${nivelCompetencia}`;
            listaCompetencias.appendChild(novaCompetencia);

            nomeCompetenciaInput.value = '';
            nivelCompetenciaSelect.value = nivelCompetencia; // Defina o valor padrão diretamente usando a variável nivelCompetencia
        }
    });
}
