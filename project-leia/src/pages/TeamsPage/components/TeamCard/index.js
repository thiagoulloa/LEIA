import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import React from "react";

export default function TeamCard({ teamId }) {
  let navigate = useNavigate();

  const [titulo, setTitulo] = React.useState("");

  const [info] = React.useState([
    {
      title: titulo,
      id: teamId,
    },
  ]);

  React.useEffect(() => {
    GetTeam();
    console.log(teamId);
  }, []);

  function GetTeam() {
    Axios.post("http://projetoleia.ddns.net:3001/getteambyid", {
      teamId: teamId,
    })
      .then((response) => {
        setTitulo(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div
      className="team-card"
      onClick={() => navigate("/team-page", { state: info })}
    >
      <p className="card-text">{titulo}</p>
    </div>
  );
}
