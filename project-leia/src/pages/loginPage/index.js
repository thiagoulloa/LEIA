import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../../images/logoleia.png";

function LoginPage() {
  let navigate = useNavigate();

  return (
    <div className="loginPage">
      <div className="containerLogin">
        <div className="logoDivLogin">
          <img id="logo" src={LogoLeia} onClick={() => navigate("/")}></img>
        </div>
        <div className="align-center">
          <input
            placeholder="Digite seu email"
            id="email"
            className="input form"
          ></input>
          <input
            placeholder="Digite sua senha"
            type="password"
            id="password"
            className="input form"
          ></input>
          <button
            className="login-button"
            onClick={() => navigate("/home-page")}
          >
            Login
          </button>
          <div className="txtBtnDivLogin">
            <p
              className="textButton"
              id="createAccBtn"
              onClick={() => navigate("/register-page")}
            >
              Crie sua conta
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
