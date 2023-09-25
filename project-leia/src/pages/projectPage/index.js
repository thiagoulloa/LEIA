import React from "react";
import MenuButton from "./images/menubar.png";
import LogoLeia from "../../images/logoleia_arquivo.png";
import BasicCard from "./components/Card";
import Folder from "./components/Folder";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";
import Popup from "reactjs-popup";

import Axios from "axios";
import SideMenu from "../../components/SideMenu/sidemenu";

export default function ProjectPage() {
  let navigate = useNavigate();
  const [documents, setDocuments] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [folderTitle, setFolderTitle] = React.useState("");
  const [folders, setFolders] = React.useState("");

  const { state } = useLocation();

  const [info] = React.useState([
    {
      user: state[0].user,
      projectId: state[0].projectId,
    },
  ]);

  React.useEffect(() => {
    getDocuments();
    getFolders();
  }, []);

  function searchDocuments() {
    if (searchValue.length >= 1) {
      Axios.post("http://projetoleia.ddns.net:3001/searchdocs", {
        id_project: state[0].projectId,
        titulo: searchValue,
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
    Axios.post("http://projetoleia.ddns.net:3001/getdocs", {
      id_project: state[0].projectId,
    })
      .then((response) => {
        setDocuments(response.data);
      })
      .catch((error) => console.log(error));
  }

  function getFolders() {
    Axios.post("http://projetoleia.ddns.net:3001/getfolders", {
      id_project: state[0].projectId,
    })
      .then((response) => {
        setFolders(response.data);
      })
      .catch((error) => console.log(error));
  }

  function createFolder() {
    Axios.post("http://projetoleia.ddns.net:3001/createfolder", {
      id_project: state[0].projectId,
      id_usuario: state[0].user,
      titulo: folderTitle,
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="homePage">
      <SideMenu state={state[0].user} />
      <div className="content homePage">
        <div className="align-top homepage">
          <h1 id="title-home">Seus Arquivos:</h1>
          <div className="align-right homepage">
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
                onClick={searchDocuments}
              />
            </div>
            <button
              className="new-button"
              onClick={() => navigate("/work-page", { state: info })}
            >
              Novo Arquivo
            </button>
            <Popup
              trigger={
                <button className="new-button new-folder">Nova Pasta</button>
              }
            >
              <div className="popup-folder">
                <div className="new-folder-div">
                  <input
                    className="folder-title-input"
                    value={folderTitle}
                    onChange={(e) => setFolderTitle(e.target.value)}
                  ></input>
                  <FontAwesomeIcon
                    className="add-title-icon"
                    icon={faPlus}
                    onClick={createFolder}
                  />
                </div>
              </div>
            </Popup>
          </div>
        </div>

        <div className="align-center homepage">
          <div className="folders-cards">
            {folders.length > 0 &&
              folders.map((folder) => (
                <Folder
                  key={folder.id}
                  titulo={folder.titulo}
                  id={folder.id}
                  projectId={state[0].projectId}
                  userId={state[0].user}
                />
              ))}
            {documents.length > 0 &&
              documents.map((document) => (
                <BasicCard
                  titulo={document.titulo}
                  preview={document.preview}
                  documentId={document.id}
                  projectId={state[0].projectId}
                  userId={state[0].user}
                  folders={folders}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
