import NivelCompetencia from "../modelo/nivelCompetencia";

document.addEventListener("DOMContentLoaded", () => {
    // Variáveis relacionadas à competência da vaga
    const adicionarCompetenciaVagaButton = document.querySelector("#adicionar-competencia-vaga") as HTMLButtonElement;
    const nomeCompetenciaVagaInput = document.querySelector("#nomeCompetenciaVaga") as HTMLInputElement;
    const nivelCompetenciaVagaSelect = document.querySelector("#nivelCompetenciaVaga") as HTMLSelectElement;
    const listaCompetenciasVaga = document.querySelector("#lista-competencias-vaga") as HTMLUListElement;

    // Variáveis relacionadas às vagas
    const adicionarVagaButton = document.querySelector("#adicionar-vaga") as HTMLButtonElement;
    const nomeVagaInput = document.querySelector("#nomeVaga") as HTMLInputElement;
    const descricaoVagaInput = document.querySelector("#descricaoVaga") as HTMLTextAreaElement;
    const listaVagas = document.querySelector("#lista-vagas") as HTMLUListElement;

    // Lista de vagas
    const vagas: { nome: string, descricao: string, competencias: string[] }[] = [];

    // Função para adicionar competência da vaga
    function adicionarCompetenciaVaga() {
        const nomeCompetenciaVaga = nomeCompetenciaVagaInput.value;
        const nivelCompetenciaVaga = nivelCompetenciaVagaSelect.value as NivelCompetencia; // Use o enum NivelCompetencia
    
        if (nomeCompetenciaVaga.trim() === "") {
            alert("Por favor, insira o nome da competência.");
            return;
        }
    
        const competenciaVagaItem = document.createElement("li");
        competenciaVagaItem.textContent = `${nomeCompetenciaVaga} - ${NivelCompetencia[nivelCompetenciaVaga]}`; // Adiciona o nível aqui usando o enum
        listaCompetenciasVaga.appendChild(competenciaVagaItem);
    
        nomeCompetenciaVagaInput.value = "";
    }
    
    adicionarCompetenciaVagaButton.addEventListener("click", adicionarCompetenciaVaga);

    function adicionarVaga() {
    const nomeVaga = nomeVagaInput.value;
    const descricaoVaga = descricaoVagaInput.value;
    const competenciasVaga = Array.from(listaCompetenciasVaga.children)
        .map(item => item.textContent?.split(" - ")) // Divide o texto em partes
        .filter(partes => partes !== undefined && partes.length === 2) // Filtra partes com dois elementos (nome e nível)
        .map(partes => {
            const nomeCompetencia = partes![0];
            const nivelCompetenciaTexto = partes![1];

            let nivelCompetencia: NivelCompetencia;

            if (nivelCompetenciaTexto.trim() === 'Básico') {
                nivelCompetencia = NivelCompetencia.Basico;
            } else if (nivelCompetenciaTexto.trim() === 'Intermediário') {
                nivelCompetencia = NivelCompetencia.Intermediario;
            } else if (nivelCompetenciaTexto.trim() === 'Avançado') {
                nivelCompetencia = NivelCompetencia.Avancado;
            } else {
                nivelCompetencia = NivelCompetencia.Basico;
            }

            return `${nomeCompetencia} - ${nivelCompetenciaTexto}`; // Formata novamente como "nome - nível"
        })
        .filter(competencia => competencia !== null) as string[];

    if (nomeVaga.trim() === "" || descricaoVaga.trim() === "" || competenciasVaga.length === 0) {
        alert("Por favor, preencha todos os campos da vaga.");
        return;
    }

    const vaga = { nome: nomeVaga, descricao: descricaoVaga, competencias: competenciasVaga };
    vagas.push(vaga);

    const vagaItem = document.createElement("li");
    const competenciasFormatted = competenciasVaga.join(", ");
    vagaItem.innerHTML = `<strong>${nomeVaga}</strong><br>${descricaoVaga}<br>Competências: ${competenciasFormatted}`;
    listaVagas.appendChild(vagaItem);

    nomeVagaInput.value = "";
    descricaoVagaInput.value = "";
    listaCompetenciasVaga.innerHTML = "";
}



    adicionarVagaButton.addEventListener("click", adicionarVaga);
});
