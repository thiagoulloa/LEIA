import * as React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function BasicCard({ titulo, preview, userId }) {
  let navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate("/work-page", { state: userId })}
    >
      <div className="title">
        <h2 className="card-title">{titulo}</h2>
      </div>

      <div className="text">
        <p className="card-text" id="content-text">
          {preview}...
        </p>
      </div>
    </div>
  );
}
