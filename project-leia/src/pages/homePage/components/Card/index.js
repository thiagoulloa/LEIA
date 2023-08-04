import icondc from "../../images/icondc.png";
import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { faUser, faPencilSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProjectCard({ titulo, preview, projectId, userId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      user: userId,
      projectId: projectId,
    },
  ]);

  return (
    <div className="cardHome">
      <div
        className="proj-card-left"
        onClick={() => navigate("/project-page", { state: info })}
      >
        <div className="Icon">
          <img src={icondc} className="Icon"></img>
        </div>
        <div className="Texto">
          <div className="Titulo">{titulo}</div>
          <div className="Desc">{preview}</div>
        </div>
      </div>
      <div className="AlignRight">
        <div className="editar">
          <FontAwesomeIcon
            className="ico"
            id="edit-icon"
            icon={faPencilSquare}
            onClick={() => navigate("/new-project", { state: info })}
          />
        </div>
      </div>
    </div>
  );
}
