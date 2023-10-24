import Candidato from "../../modelo/Candidato";
import CandidatoDTO from "../../modelo/dto/CandidatoDTO";

interface ICandidatoService{
    listarCandidatos(): Candidato[];
    listarCandidatosDTO(): CandidatoDTO[];
    cadastrarCandidato(candidato: Candidato): void;
    atualizarCandidatoNoLocalStorage(candidatoAtualizado: Candidato): void;
}export default ICandidatoService