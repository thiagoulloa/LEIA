import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../images/logoleia.png";

function LoginPage() {
  let navigate = useNavigate();

  return (
    <div className="loginPage">
      <div className="container">
        <div className="logoDiv">
          <img id="logo" src={LogoLeia}></img>
        </div>    
        <div className="align-center">
          <input placeholder="Digite seu email" id="email"></input>
          <input placeholder="Digite sua senha" type="password" id="password"></input>
          <button>Login</button>
          <div className="txtBtnDiv">
            <p className="textButton" id="createAccBtn">
              Crie sua conta
            </p>
            <p className="textButton" id="forgotPswBtn">
              Esqueceu sua senha?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
