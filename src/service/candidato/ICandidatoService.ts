import Candidato from "../../modelo/Candidato";

interface ICandidatoService{
    listarCandidatos(): Promise<Candidato[]>;
    obterCandidatoPorId(idCandidato: number): Promise<Candidato | undefined> ;
    adicionarCandidato(candidato: Candidato): Promise<void>;
    atualizarCandidato(id: number, candidato: Candidato): Promise<boolean>;
    excluirCandidato(idCandidato: number): Promise<boolean>
}export default ICandidatoService