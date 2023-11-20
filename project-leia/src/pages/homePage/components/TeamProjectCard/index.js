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
      teamId: teamId,
    },
  ]);

  React.useEffect(() => {
    GetTeam();
  }, []);

  async function GetTeam() {
    try {
      const response = await Axios.post(
        "http://projetoleia.ddns.net:3001/getteambyid",
        {
          teamId: teamId,
        }
      );
      console.log(response.data);
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
              onClick={navigateTeamPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
