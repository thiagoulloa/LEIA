import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../images/logoleia.png";
import "./style.css";

function IntroductionPage() {
  let navigate = useNavigate();

  return (
    <div className="IntroductionPage">
      <div className="topBar">
        <div className="alignLeft">
          <img className="logo homebar" src={LogoLeia}></img>
        </div>
        <div className="alignRight">
          <p id="loginBtn" onClick={() => navigate("/login-page")}>
            Sign In
          </p>

          <button id="registerBtn" onClick={() => navigate("/register-page")}>
            Sign Up
          </button>
        </div>
      </div>

      <div className="information-text">
        <h3>LEIA </h3>
        <p className="welcome-text">
          "Caro usuário, sua privacidade e segurança são extremamente
          importantes para nós. Queremos garantir que nosso site de documentação
          de texto não colete informações confidenciais de nossos usuários e que
          você possa usar nossos serviços com tranquilidade. Ao usar nosso site,
          você pode garantir que todas as informações inseridas em nossos
          formulários sejam armazenadas com segurança em nossos servidores e
          acessíveis apenas por você ou por pessoas autorizadas. Não
          compartilhamos, vendemos ou divulgamos suas informações a terceiros
          sem o seu consentimento. Além disso, usamos as últimas tecnologia de
          segurança de dados, como criptografia SSL, para garantir que suas
          informações sejam transmitidas com segurança entre seu navegador e
          nossos servidores às vezes. Assim, você pode ficar tranquilo ao usar
          nosso site para documentar seu texto, sabendo que seus dados pessoais
          e documentos estão seguros conosco. Obrigado pela confiança em nossos
          serviços de documentação de texto e estamos sempre prontos para ajudar
          em qualquer dúvida ou problema. Confie em nós!"
        </p>
      </div>
    </div>
  );
}

export default IntroductionPage;
