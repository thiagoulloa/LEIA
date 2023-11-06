import "../../css/PagesDesign/teamPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useLocation } from "react-router-dom";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import CardUser from "./components/CardUser";

export default function TeamPage() {
  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [newUserId, setNewUserId] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const { state } = useLocation();

  React.useEffect(() => {
    console.log(state);
    GetTeamUsers();
  }, []);

  function AddUserIntoTeam() {
    Axios.post("http://projetoleia.ddns.net:3001/getuseridbyemail", {
      email: email,
    })
      .then((response) => {
        setNewUserId(response.data[0].id);
        Axios.post("http://projetoleia.ddns.net:3001/sendteaminvite", {
          teamId: state[0].id,
          destinatarioId: newUserId,
          remetenteId: state[0].userId,
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }

  function GetTeamUsers() {
    Axios.post("http://projetoleia.ddns.net:3001/getuserbyteamid", {
      id_time: state[0].id,
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="team-page">
      <SideMenu state={state[0].userId} />
      <div className="team-page-team">
        <div className="teams-page-top">
          <FontAwesomeIcon className="teamicontm" icon={faPeopleGroup} />
          <h1 className="title-team">{state[0].title}</h1>
        </div>
        <div className="team-users">
          <h1 className="title">Colaboradores:</h1>
        </div>
        <div className="container-carduser">
          {users.length > 0 &&
            users.map((user) => (
              <CardUser userId={user.ID_usuario} key={user.ID_usuario} />
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
    </div>
  );
}
