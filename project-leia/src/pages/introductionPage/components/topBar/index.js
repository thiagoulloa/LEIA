import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../../images/logoleia.png";
import "../../style.css";

export default function TopBar() {
  let navigate = useNavigate();

  return (
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
  );
}