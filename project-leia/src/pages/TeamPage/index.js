import "../../css/PagesDesign/teamPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useLocation } from "react-router-dom";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import CardUser from "./components/CardUser";
import CardProjects from "./components/CardProjects";
import CardOwner from "./components/CardOwner";

export default function TeamPage({ notifySuccess, notifyError }) {
  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projects, setProjects] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [lider, setLider] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const { state } = useLocation();

  React.useEffect(() => {
    GetTeamUsers();
    GetTeamName();
    GetTeamOwner();
    getTeamProjects();
    console.log(state);
  }, []);

  function AddUserIntoTeam() {
    Axios.post("http://projetoleia.ddns.net:3001/sendteaminvite", {
      teamId: state.teamId,
      email: email,
      remetenteId: state.userId,
    })
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Convite enviado");
          setEmail("");
        }
        console.log(response);
      })
      .catch((error) => console.log(error));
  }

  function GetTeamUsers() {
    Axios.post("http://projetoleia.ddns.net:3001/getuserbyteamid", {
      id_time: state.teamId,
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  function GetTeamOwner() {
    Axios.post("http://projetoleia.ddns.net:3001/getteamowner", {
      teamId: state.teamId,
    })
      .then((response) => {
        setLider(response.data[0].username);
      })
      .catch((error) => console.log(error));
  }

  function GetTeamName() {
    Axios.post("http://projetoleia.ddns.net:3001/getteambyid", {
      teamId: state.teamId,
    })
      .then((response) => {
        setTitulo(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function getTeamProjects() {
    Axios.post("http://projetoleia.ddns.net:3001/getteamprojects", {
      teamId: state.teamId,
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="team-page">
      <SideMenu state={state.userId} />
      <div className="team-page-team">
        <div className="teams-page-top">
          <FontAwesomeIcon className="teamicontm" icon={faPeopleGroup} />
          <h1 className="title-team">{titulo}</h1>
        </div>

        <div className="users-projects">
          <div className="container-left-teampage">
            <h1 className="title">Colaboradores:</h1>

            <div className="container-carduser">
              <CardOwner owner={lider} />
              {users.length > 0 &&
                users.map((user) => (
                  <CardUser
                    userId={user.ID_usuario}
                    key={user.ID_usuario}
                    teamId={state.teamId}
                    ownerId={state.ownerId}
                    logUserId={state.userId}
                    notifyError={notifyError}
                    notifySuccess={notifySuccess}
                    GetTeamUsers={GetTeamUsers}
                  />
                ))}
            </div>
            <div className="teams-page-bottom">
              <h2 className="title">Adicionar Colaboradores:</h2>
              <div className="add-colab-container">
                <input
                  className="input-colab"
                  placeholder="E-mail do colaborador"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <FontAwesomeIcon
                  className="add-colab-icon"
                  icon={faPaperPlane}
                  onClick={() => AddUserIntoTeam()}
                />
              </div>
            </div>
          </div>
          <div className="container-projects">
            <h1 className="title">Projetos da Equipe:</h1>

            {projects.length > 0 &&
              projects.map((project) => (
                <CardProjects
                  titulo={project.titulo}
                  desc={project.descricao}
                  key={project.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
