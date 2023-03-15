import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../images/logoleia.png";

function WorkPage() {
  let navigate = useNavigate();

  return (
    <div className="workPage">
      <div className="containerWork"></div>
      <div className="align-center"></div>
    </div>
  );
}

export default WorkPage;
