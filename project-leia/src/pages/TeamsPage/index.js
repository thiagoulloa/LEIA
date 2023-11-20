import "../../css/PagesDesign/teamsPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useLocation } from "react-router-dom";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreatedTeamCard from "./components/CreatedTeamCard/index.js";
import TeamCard from "./components/TeamCard";
import Popup from "reactjs-popup";
import Axios from "axios";
import InviteCard from "./components/InvitesCard";

export default function TeamsPage({ notifySuccess }) {
  const [teamName, setTeamName] = React.useState("");
  const [createdTeams, setCreatedTeams] = React.useState("");
  const [invites, setInvites] = React.useState("");
  const [teams, setTeams] = React.useState("");

  const { state } = useLocation();

  React.useEffect(() => {
    console.log(state);
    GetCreatedTeams();
    GetUserTeams();
    GetInvites();
  }, []);

  function SendTeam() {
    Axios.post("http://projetoleia.ddns.net:3001/saveteams", {
      id_usuario: state,
      titulo: teamName,
    })
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Equipe criada com sucesso!");
          GetCreatedTeams();
        }
      })
      .catch((error) => console.log(error));
  }

  function GetCreatedTeams() {
    Axios.post("http://projetoleia.ddns.net:3001/getusercreatedteams", {
      userId: state,
    })
      .then((response) => {
        setCreatedTeams(response.data);
      })
      .catch((error) => console.log(error));
  }

  function GetUserTeams() {
    Axios.post("http://projetoleia.ddns.net:3001/getteamuser", {
      userId: state,
    })
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => console.log(error));
  }

  function GetInvites() {
    Axios.post("http://projetoleia.ddns.net:3001/getinvites", {
      userId: state,
    })
      .then((response) => {
        setInvites(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="teams-page">
      <SideMenu state={state} />

      <div className="teams-page-teams">
        <div className="teams-page-top">
          <Popup
            trigger={
              <FontAwesomeIcon className="invites-icon" icon={faEnvelope} />
            }
          >
            <div className="invites-popup">
              {invites.length > 0 &&
                invites.map((invites) => (
                  <InviteCard
                    key={invites.id}
                    id={invites.id}
                    id_time={invites.id_time}
                    id_destinatario={invites.id_destinatario}
                    id_remetente={invites.id_remetente}
                    userId={state}
                  />
                ))}
            </div>
          </Popup>
          <h1 id="title">Suas Equipes:</h1>
        </div>
        <div className="teams-cards">
          {createdTeams.length > 0 &&
            createdTeams.map((cteam) => (
              <CreatedTeamCard
                key={cteam.id}
                titulo={cteam.titulo}
                teamId={cteam.id}
                ownerId={cteam.id_usuarios}
                userId={state}
              />
            ))}
          {teams.length > 0 &&
            teams.map((team) => (
              <TeamCard
                key={team.id_time}
                teamId={team.id_time}
                userId={state}
              />
            ))}
        </div>
      </div>
      <div className="create-team-menu">
        <div className="teams-page-top">
          <h1 id="title">Crie sua equipe:</h1>
        </div>
        <div className="teams-page-center">
          <input
            className="input"
            placeholder="Digite o nome de sua equipe"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          ></input>
          <button className="sendTeam-button" onClick={() => SendTeam()}>
            Enviar Time
          </button>
        </div>
      </div>
    </div>
  );
}
