import * as React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import OpenPopUp from "../PopUp/popup";

export default function BasicCard({ titulo, preview, userId, projectId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      user: userId,
      project: projectId,
    },
  ]);

  return (
    <div className="content">
      <div className="card" onClick={OpenPopUp(titulo)}>
        <div className="card-title-container">
          <h2 className="card-title">{titulo}</h2>
        </div>

        <div className="card-text-container">
          <p className="card-text" id="content-text">
            {preview}...
          </p>
        </div>
      </div>
    </div>
  );
}
