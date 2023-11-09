import Candidato from "../../modelo/Candidato";
import CandidatoDTO from "../../modelo/CandidatoDTO";

interface ICandidatoService{
    listarCandidatos(): Promise<CandidatoDTO[]>;
    obterCandidatoPorId(idCandidato: number): Promise<Candidato | undefined> ;
    adicionarCandidato(candidato: Candidato): Promise<void>;
    atualizarCandidato(id: number, candidato: Candidato): Promise<boolean>;
    excluirCandidato(idCandidato: number): Promise<boolean>
}export default ICandidatoService