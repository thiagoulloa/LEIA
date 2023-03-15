import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../images/logoleia.png";

function RegisterPage() {
  let navigate = useNavigate();

  return (
    <div className="registerPage">
      <div className="containerRegister">
        <div className="logoDivRegister">
          <img id="logo" src={LogoLeia}></img>
        </div>
        <div className="align-center">
          <input
            placeholder="Crie um username"
            id="username"
            className="input form"
          ></input>
          <input
            placeholder="Digite seu email"
            id="email"
            className="input form"
          ></input>
          <input
            placeholder="Crie uma senha"
            type="password"
            id="password"
            className="input form"
          ></input>
          <button className="register-button">Cadastre-se</button>
          <div className="txtBtnDivRegister">
            <p className="textButtonRegister" id="createAccBtn">
              Já possui uma conta?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
