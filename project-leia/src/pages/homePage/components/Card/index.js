import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  faPeopleGroup,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

export default function ProjectCard({
  titulo,
  preview,
  projectId,
  userId,
  teamId,
  projectOwner,
}) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      userId: userId,
      projectId: projectId,
      teamId: teamId,
    },
  ]);

  function CheckPermission() {
    if (userId === projectOwner) {
      navigate("/projConfig", { state: info });
    } else {
      console.log("Sem Permissão");
    }
  }

  function DeleteProjects() {
    if (userId === projectOwner) {
      Axios.post("http://projetoleia.ddns.net:3001/deleteProjects", {
        id_usuario: projectOwner,
        id_projects: projectId,
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("projeto deletado");
            window.location.reload();
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            console.log(error);
          }
        });
    } else {
      console.log("Sem Permissão");
    }
  }

  async function GetTeam() {
    try {
      const response = await Axios.post(
        "http://projetoleia.ddns.net:3001/getteambyid",
        {
          teamId: teamId,
        }
      );

      const [infoTpg] = [
        {
          teamId: teamId,
          userId: userId,
          ownerId: response.data[0].id_usuarios,
        },
      ];
      return infoTpg;
    } catch (error) {
      console.error(error);
    }
  }

  const navigateTeamPage = async () => {
    const infoTpg = await GetTeam();

    if (infoTpg) {
      navigate("/team-page", { state: infoTpg });
    }
  };

  return (
    <div className="cardHome">
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
              id="edit-icon"
              icon={faPencilSquare}
              onClick={() => CheckPermission()}
            />
          </div>
          <div className="excluir">
            <FontAwesomeIcon
              className="ico"
              id="delete-icon"
              icon={faTrash}
              onClick={() => DeleteProjects()}
            />
          </div>
          {teamId !== null && (
            <div className="equipe-icon-div">
              <FontAwesomeIcon
                className="ico"
                id="team-icon"
                icon={faPeopleGroup}
                onClick={navigateTeamPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
