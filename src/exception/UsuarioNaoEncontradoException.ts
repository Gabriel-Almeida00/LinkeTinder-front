class UsuarioNaoEncontradoException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UsuarioNaoEncontradoException';
    }
}