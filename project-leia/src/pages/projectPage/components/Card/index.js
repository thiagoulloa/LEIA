import * as React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import OpenPopUp from "../PopUp/popup";
import {
  faUser,
  faPencilSquare,
  faTrash,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MiniFolder from "./minifolder";
import Popup from "reactjs-popup";
import Axios from "axios";

export default function BasicCard({
  titulo,
  preview,
  projectId,
  documentId,
  userId,
  folders,
}) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      projectId: projectId,
      documentId: documentId,
      user: userId,
    },
  ]);

  function deleteDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/deletecard", {
      id_project: projectId,
      id_card: documentId,
    })
      .then((response) => {
        if (response.status === 200) {
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 500) {
          console.log(error);
        }
      });
  }

  return (
    <div className="content">
      <Popup trigger={<button>Adicionar a pasta</button>}>
        <div className="popup-addtofolder">
          <div className="addtofolder-div">
            {folders.length > 0 &&
              folders.map((folder) => (
                <MiniFolder
                  key={folder.id}
                  titulo={folder.titulo}
                  folderId={folder.id}
                  documentId={documentId}
                />
              ))}
          </div>
        </div>
      </Popup>
      <div
        className="card"
        onClick={() => navigate("/work-page", { state: info })}
      >
        <div className="hover-func">
          <div className="hover-func-btns">
            <div className="editar-doc">
              <FontAwesomeIcon
                className="ico"
                id="edit-icon"
                icon={faPencilSquare}
                onClick={() => navigate("/work-page", { state: info })}
              />
            </div>
            <div className="excluir-doc">
              <FontAwesomeIcon
                className="ico"
                id="delete-icon"
                icon={faTrash}
                onClick={() => deleteDoc()}
              />
            </div>
          </div>
        </div>
        <div className="card-title-container">
          <h2 className="card-title">{titulo}</h2>
        </div>

        <div className="card-text-container">
          <p className="card-text" id="content-text">
            {preview}...
          </p>
        </div>
        <div className="editar">
          <FontAwesomeIcon
            className="ico"
            id="edit-icon"
            icon={faSearch}
            onClick={() => navigate("/new-project", { state: info })}
          />
        </div>
        <div className="card-blur"></div>
      </div>
    </div>
  );
}
