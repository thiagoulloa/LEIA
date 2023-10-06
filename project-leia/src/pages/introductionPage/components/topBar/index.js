import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../../images/logoleia.png";
import { Link, animateScroll as scroll } from "react-scroll";
import "../../../../css/Components/introPage.css";

export default function TopBar() {
  let navigate = useNavigate();

  return (
    <div className="top-bar-introduction">
      <div className="alignLeft-homeb">
        <img className="logo homebar" src={LogoLeia}></img>
        <div className="directs-introduction">
          <p className="top-directs"> Objetivos </p>
          <p className="top-directs"> Solução </p>
        </div>
      </div>

      <div className="alignRight introduction">
        <p id="loginBtn" onClick={() => navigate("/login-page")}>
          Fazer Login
        </p>

        <button id="registerBtn" onClick={() => navigate("/register-page")}>
          Cadastre-se
        </button>
      </div>
    </div>
  );
}
