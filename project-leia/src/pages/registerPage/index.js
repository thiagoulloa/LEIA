import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../images/logoleia.png";

function RegisterPage() {
  let navigate = useNavigate();

  return (
    <div className="registerPage">
      <div className="container">
        <div className="logoDiv">
          <img id="logo" src={LogoLeia}></img>
        </div>
        <div className="align-center">
        <input placeholder="Crie um username" id="username"></input>
          <input placeholder="Digite seu email" id="email"></input>
          <input placeholder="Crie uma senha" type="password" id="password"></input>
          <button>Cadastre-se</button>
          <div className="txtBtnDiv">
            <p className="textButton" id="createAccBtn">
              Já possui uma conta?
            </p>
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
