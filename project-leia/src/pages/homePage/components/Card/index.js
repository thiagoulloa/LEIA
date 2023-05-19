import * as React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function BasicCard() {
  let navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate("/work-page")}>
      <div className="title">
        <h2 className="card-title">Componente -------</h2>
      </div>

      <div className="text">
        <p className="card-text">
          O componente consiste em... exemplo exemplo exemplo
        </p>
      </div>
    </div>
  );
}
