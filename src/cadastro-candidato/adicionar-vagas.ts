

/*document.addEventListener("DOMContentLoaded", () => {
    // Variáveis relacionadas à competência da vaga
    const adicionarCompetenciaVagaButton = document.querySelector("#adicionar-competencia-vaga") as HTMLButtonElement;
    const nomeCompetenciaVagaInput = document.querySelector("#nomeCompetenciaVaga") as HTMLInputElement;
    const nivelCompetenciaVagaSelect = document.querySelector("#nivelCompetenciaVaga") as HTMLSelectElement;
    const listaCompetenciasVaga = document.querySelector("#lista-competencias-vaga") as HTMLUListElement;

    // Variáveis relacionadas às vagas
    const adicionarVagaButton = document.querySelector("#adicionar-vaga") as HTMLButtonElement;
    const nomeVagaInput = document.querySelector("#nomeVaga") as HTMLInputElement;
    const descricaoVagaInput = document.querySelector("#descricaoVaga") as HTMLTextAreaElement;
    const nivelExperienciaVagaSelect = document.querySelector("#nivelExperienciaVaga") as HTMLSelectElement;
    const nivelFormacaoVagaSelect = document.querySelector("#nivelFormacaoVaga") as HTMLSelectElement;
    const listaVagas = document.querySelector("#lista-vagas") as HTMLUListElement;

    // Lista de vagas
    const vagas: { nome: string, descricao: string, competencias: string[], nivelExperiencia: NivelExperiencia, nivelFormacao: NivelFormacao }[] = [];

    // Função para adicionar competência da vaga
    function adicionarCompetenciaVaga() {
        const nomeCompetenciaVaga = nomeCompetenciaVagaInput.value;
        const nivelCompetenciaVaga = nivelCompetenciaVagaSelect.value as NivelCompetencia;
    
        if (nomeCompetenciaVaga.trim() === "") {
            alert("Por favor, insira o nome da competência.");
            return;
        }
    
        const competenciaVagaItem = document.createElement("li");
        competenciaVagaItem.textContent = `${nomeCompetenciaVaga} - ${NivelCompetencia[nivelCompetenciaVaga]}`;
        listaCompetenciasVaga.appendChild(competenciaVagaItem);
    
        nomeCompetenciaVagaInput.value = "";
    }
    
    adicionarCompetenciaVagaButton.addEventListener("click", adicionarCompetenciaVaga);

    function adicionarVaga() {
        const nomeVaga = nomeVagaInput.value;
        const descricaoVaga = descricaoVagaInput.value;
        const nivelExperienciaVaga = nivelExperienciaVagaSelect.value as NivelExperiencia;
        const nivelFormacaoVaga = nivelFormacaoVagaSelect.value as NivelFormacao;

        const competenciasVaga = Array.from(listaCompetenciasVaga.children)
            .map(item => item.textContent?.split(" - "))
            .filter(partes => partes !== undefined && partes.length === 2)
            .map(partes => `${partes![0]} - ${partes![1]}`)
            .filter(competencia => competencia !== null) as string[];

        if (nomeVaga.trim() === "" || descricaoVaga.trim() === "" || competenciasVaga.length === 0) {
            alert("Por favor, preencha todos os campos da vaga.");
            return;
        }

        const vaga = {
            nome: nomeVaga,
            descricao: descricaoVaga,
            competencias: competenciasVaga,
            nivelExperiencia: nivelExperienciaVaga,
            nivelFormacao: nivelFormacaoVaga
        };
        vagas.push(vaga);

        const vagaItem = document.createElement("li");
        const competenciasFormatted = competenciasVaga.join(", ");
        vagaItem.innerHTML = `<strong>${nomeVaga}</strong><br>${descricaoVaga}<br>Competências: ${competenciasFormatted}<br>Nível de Experiência: ${NivelExperiencia[nivelExperienciaVaga]}<br>Nível de Formação: ${NivelFormacao[nivelFormacaoVaga as keyof typeof NivelFormacao]}`;
        listaVagas.appendChild(vagaItem);

        nomeVagaInput.value = "";
        descricaoVagaInput.value = "";
        listaCompetenciasVaga.innerHTML = "";
    }

    adicionarVagaButton.addEventListener("click", adicionarVaga);
});*/
