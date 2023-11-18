import React from "react";
import "../../../../css/PagesDesign/homePage.css";
import { useNavigate } from "react-router-dom";
import { faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

export default function TeamProjectCard({
  titulo,
  preview,
  projectId,
  userId,
  teamId,
}) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      userId: userId,
      projectId: projectId,
      id: teamId,
    },
  ]);

  return (
    <div className="tm-proj-card-home">
      <div
        className="proj-card-left"
        onClick={() => navigate("/project-page", { state: info })}
      >
        <div className="Texto">
          <div className="Titulo">{titulo}</div>
          <div className="Desc">{preview}</div>
        </div>
      </div>
      <div className="AlignRight proj-card">
        <div className="icons proj-card">
          <div className="editar">
            <FontAwesomeIcon
              className="ico"
              id="team-icon"
              icon={faPeopleGroup}
              onClick={() => navigate("/team-page", { state: info })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
