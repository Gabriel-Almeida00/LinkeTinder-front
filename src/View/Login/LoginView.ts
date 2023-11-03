import LoginController from "../../Controler/Login/LoginController";

class LoginView{
    private controller: LoginController;

    constructor(){
        this.controller = new LoginController();
    }

}export default LoginView;