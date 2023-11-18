import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import React from "react";

export default function TeamCard({ teamId, userId }) {
  let navigate = useNavigate();

  const [titulo, setTitulo] = React.useState("");

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

      setTitulo(response.data[0].titulo);
      console.log(response.data);
      const [info] = [
        {
          teamId: teamId,
          userId: userId,
          ownerId: response.data[0].id_usuarios,
        },
      ];
      return info;
    } catch (error) {
      console.error(error);
    }
  }

  const navigateTeamPage = async () => {
    const info = await GetTeam();

    if (info) {
      navigate("/team-page", { state: info });
    }
  };
  return (
    <div className="team-card" onClick={navigateTeamPage}>
      <p className="teamcard-text">{titulo}</p>
    </div>
  );
}
