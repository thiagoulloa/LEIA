import "../../css/PagesDesign/teamsPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useLocation } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";

export default function TeamsPage() {
  const [teamName, setTeamName] = React.useState("");
  const [colabEmail, setColabEmail] = React.useState("");

  const { state } = useLocation();

  React.useEffect(() => {
    console.log(state);
  }, []);

  function SendTeam() {
    Axios.post("http://localhost:3001/saveteams", {
      id_usuario: state,
      titulo: teamName,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="teams-page">
      <SideMenu state={state} />

      <div className="teams-page-top">
        <h1 id="title">Sua Equipe:</h1>
      </div>
      <div className="teams-page-center">
        <input
          className="input"
          placeholder="Digite o nome de sua equipe"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        ></input>
      </div>
      <div className="teams-page-bottom">
        <h2 className="title">Adicionar Colaboradores:</h2>
        <div className="add-colab-container">
          <input
            className="input-colab"
            placeholder="E-mail do colaborador"
            value={colabEmail}
            onChange={(e) => setColabEmail(e.target.value)}
          ></input>
          <FontAwesomeIcon className="add-colab-icon" icon={faPlus} />
        </div>
      </div>
      <button onClick={() => SendTeam()}>Enviar Time</button>
    </div>
  );
}
