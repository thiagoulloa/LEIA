import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function CreatedTeamCard({ teamId, titulo, userId, ownerId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      title: titulo,
      teamId: teamId,
      userId: userId,
      ownerId: ownerId,
    },
  ]);

  return (
    <div
      className="team-card"
      onClick={() => navigate("/team-page", { state: info[0] })}
    >
      <p className="teamcard-text">{titulo}</p>
    </div>
  );
}
