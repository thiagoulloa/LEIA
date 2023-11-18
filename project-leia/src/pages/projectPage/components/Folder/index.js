import * as React from "react";
import "./folderstyle.css";
import { useNavigate } from "react-router-dom";
import FolderDocCard from "./components/FolderDocCard";
import Axios from "axios";

export default function Folder({ titulo, id, projectId, userId }) {
  let navigate = useNavigate();

  const [documents, setDocuments] = React.useState("");

  const [info] = React.useState([
    {
      projectId: projectId,
      userId: userId,
      folderId: id,
    },
  ]);

  React.useEffect(() => {
    getDocsByFolder();
  }, []);

  function getDocsByFolder() {
    Axios.post("http://projetoleia.ddns.net:3001/getcompare_time", {
      folderId: id,
    })
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="content">
      <div className="folder">
        <div className="folder-top">
          <div
            className="folder-tab"
            onClick={() => navigate("/folder-page", { state: info })}
          >
            <p className="folder-title">{titulo}</p>
          </div>
          <div className="folder-right"></div>
        </div>

        <div className="folder-cards">
          {documents.length > 0 &&
            documents.map((document) => (
              <FolderDocCard
                key={document.id}
                titulo={document.titulo}
                id={document.id}
                userId={userId}
                projectId={document.id_project}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
