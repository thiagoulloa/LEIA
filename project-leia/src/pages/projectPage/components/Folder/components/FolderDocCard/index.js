import * as React from "react";
import "../.././folderstyle.css";
import { useNavigate } from "react-router-dom";

export default function FolderDocCard({ titulo, id, userId, projectId }) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      projectId: projectId,
      documentId: id,
      userId: userId,
    },
  ]);

  return (
    <div
      className="folder-doc-card"
      onClick={() => navigate("/work-page", { state: info })}
    >
      <h3 className="folder-doc-card-title">{titulo}</h3>
    </div>
  );
}
