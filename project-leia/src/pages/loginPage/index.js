import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../images/logoleia.png";

function LoginPage() {
  let navigate = useNavigate();

  return (
    <div className="home">
      <h1>Login Page</h1>
      <div className="container">
        <div className="logoDiv">
          <img id="logo" src={LogoLeia}></img>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
