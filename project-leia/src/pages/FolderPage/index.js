import React from "react";
import BasicCardFolder from "./Components";
import { useNavigate } from "react-router-dom";
import "../../css/PagesDesign/folder&projectPage.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Popup from "reactjs-popup";
import {
  faSearch,
  faArrowLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import Axios from "axios";
import SideMenu from "../../components/SideMenu/sidemenu";

export default function FolderPage({
  notifyError,
  notifySuccess,
  notifyWarning,
}) {
  let navigate = useNavigate();
  const [documents, setDocuments] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [titulo, setTitulo] = React.useState("");

  const { state } = useLocation();

  const [info] = React.useState([
    {
      userId: state[0].userId,
      projectId: state[0].projectId,
      folderId: state[0].folderId,
    },
  ]);

  React.useEffect(() => {
    getDocuments();
    getFolderById();
    console.log(state);
  }, []);

  function getFolderById() {
    Axios.post("http://projetoleia.ddns.net:3001/getfolderbyid", {
      folderId: state[0].folderId,
    })
      .then((response) => {
        setTitulo(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function searchDocuments() {
    if (searchValue.length >= 1) {
      Axios.post("http://projetoleia.ddns.net:3001/searchdocs", {
        id_project: state[0].projectId,
        titulo: searchValue,
        folderId: state[0].folderId,
      })
        .then((response) => {
          setDocuments(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      getDocuments();
    }
  }

  function getDocuments() {
    Axios.post("http://projetoleia.ddns.net:3001/getdocumentbyfolderid", {
      folderId: state[0].folderId,
    })
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => console.log(error));
  }

  function delFolder() {
    if (documents.length !== 0) {
      notifyWarning("Não é possível apagar pastas que contém documentos");
      console.log(documents);
    } else {
      Axios.post("http://projetoleia.ddns.net:3001/deletefolder", {
        folderId: state[0].folderId,
        userId: state[0].userId,
      })
        .then((response) => {
          if (response.status === 200) {
            navigate("/project-page", { state: info });
            notifySuccess(response.data.msg);
          }
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="folderPage">
      <SideMenu state={state[0].userId} />
      <div className="content folderPage">
        <div className="align-top-folderpage">
          <div className="align-left-folderpage">
            <FontAwesomeIcon
              className="busca"
              icon={faArrowLeft}
              onClick={() => navigate("/project-page", { state: info })}
            />
            <div className="title-container-folderpage">
              <h1 id="title">Arquivos de </h1>
              <h1 id="title-folder">{titulo}:</h1>
            </div>
          </div>

          <div className="align-right">
            <div className="search-div">
              <input
                className="search-docs"
                id="search-input"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              ></input>
              <FontAwesomeIcon
                className="busca"
                icon={faSearch}
                title="Pesquisar pasta"
                onClick={searchDocuments}
              />
            </div>
            <button
              className="new-button"
              onClick={() => navigate("/work-page", { state: info })}
            >
              Novo Arquivo
            </button>
            <FontAwesomeIcon
              id="del-folder-icon"
              icon={faTrash}
              title="Apagar pasta"
              onClick={delFolder}
            />
          </div>
        </div>

        <div className="align-center homepage">
          <div className="folders-cards">
            {documents.length > 0 &&
              documents.map((document) => (
                <BasicCardFolder
                  titulo={document.titulo}
                  preview={document.preview}
                  documentId={document.id}
                  projectId={state[0].projectId}
                  userId={state[0].user}
                  key={document.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
