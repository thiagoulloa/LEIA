import * as React from "react";
import "./style.css";
import "../../../css/PagesDesign/folder&projectPage.css";
import { useNavigate } from "react-router-dom";
import {
  faUser,
  faPencilSquare,
  faTrash,
  faSearch,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import parse from "html-react-parser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Axios from "axios";

export default function BasicCardFolder({
  titulo,
  preview,
  projectId,
  documentId,
  userId,
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

  function removeFromFold() {
    Axios.post("http://projetoleia.ddns.net:3001/removefromfolder", {
      documentId: documentId,
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
      <div className="card">
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
            <div className="remove-doc">
              <FontAwesomeIcon
                className="ico"
                id="delete-icon-card"
                icon={faMinus}
                onClick={() => removeFromFold()}
              />
            </div>
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
