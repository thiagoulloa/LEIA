import * as React from "react";
import "./style.css";
import "../../../../css/PagesDesign/folder&projectPage.css";
import { useNavigate } from "react-router-dom";
import OpenPopUp from "../PopUp/popup";
import parse from "html-react-parser";
import {
  faUser,
  faPencilSquare,
  faTrash,
  faSearch,
  faPlus,
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
  notifySuccess,
  getDocuments,
}) {
  let navigate = useNavigate();

  const [info] = React.useState([
    {
      projectId: projectId,
      documentId: documentId,
      userId: userId,
    },
  ]);

  React.useEffect(() => {}, []);

  function deleteDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/deletecard", {
      id_project: projectId,
      id_card: documentId,
    })
      .then((response) => {
        if (response.status === 200) {
          notifySuccess("Documento deletado com sucesso!");
          getDocuments();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="content">
      <div className="cardA">
        <div className="hover-func">
          <div className="hover-func-btns">
            <div className="editar-doc">
              <FontAwesomeIcon
                className="ico"
                id="edit-icon-card"
                icon={faPencilSquare}
                onClick={() => navigate("/work-page", { state: info })}
              />
            </div>
            <div className="excluir-doc">
              <FontAwesomeIcon
                className="ico"
                id="delete-icon-card"
                icon={faTrash}
                onClick={() => deleteDoc()}
              />
            </div>

            <Popup
              trigger={
                <div className="add-to-icon-card">
                  <FontAwesomeIcon
                    className="ico"
                    id="delete-icon-card"
                    icon={faPlus}
                  />
                </div>
              }
            >
              <div className="popup-addtofolder">
                <div className="addtofolder-div">
                  <p id="titpop">Adicionar a pasta:</p>
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
          </div>
        </div>
        <div className="card-title-container">
          <h2 className="card-title">{titulo}</h2>
        </div>

        <div className="card-text-container">
          <p className="card-text" id="content-text">
            {parse(preview)}
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
      </div>
    </div>
  );
}
