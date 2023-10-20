import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function CreatedTeamCard({ id, id_usuarios, titulo, userId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      title: titulo,
      id: id,
      userId: userId,
    },
  ]);

  return (
    <div
      className="team-card"
      onClick={() => navigate("/team-page", { state: info })}
    >
      <p className="teamcard-text">{titulo}</p>
      <p className="teamcard-text">{id}</p>
    </div>
  );
}
