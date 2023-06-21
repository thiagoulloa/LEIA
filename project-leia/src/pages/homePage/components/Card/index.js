import * as React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function BasicCard({ titulo, preview, userId, projectId }) {
  const [info] = React.useState([
    {
      user: userId,
      project: projectId,
    },
  ]);
  let navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => navigate("/work-page", { state: info })}
    >
      <div className="card-title-container">
        <h2 className="card-title">{titulo}</h2>
      </div>

      <div className="card-text-container">
        <p className="card-text" id="content-text">
          {preview}...
        </p>
      </div>
    </div>
  );
}
