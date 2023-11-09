class LoginDTO {
  constructor(private email: string, private senha: string) { }

  getEmail(): string {
    return this.email;
  }

  getSenha(): string {
    return this.senha;
  }
}
export default LoginDTO;
