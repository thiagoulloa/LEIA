import icondc from "../../images/icondc.png";
import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ titulo, preview, projectId, userId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      user: userId,
      projectId: projectId,
    },
  ]);

  return (
    <div
      className="cardHome"
      onClick={() => navigate("/project-page", { state: info })}
    >
      <div className="AlignLeft">
        <div className="Icon">
          <img src={icondc} className="Icon"></img>
        </div>
        <div className="Texto">
          <div className="Titulo">{titulo}</div>
          <div className="Desc">{preview}</div>
        </div>
      </div>
    </div>
  );
}
