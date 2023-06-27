import React from "react";
import MenuButton from "./images/menubar.png";
import LogoLeia from "../../images/logoleia_arquivo.png";
import BasicCard from "./components/Card";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import SideMenu from "../../components/SideMenu/sidemenu";

export default function HomePage() {
  let navigate = useNavigate();
  const [projects, setProjects] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const { state } = useLocation();

  const [info] = React.useState([
    {
      user: state,
    },
  ]);

  React.useEffect(() => {
    getProjects();
  }, []);

  function searchProjects() {
    if (searchValue.length >= 1) {
      Axios.post("http://projetoleia.ddns.net:3001/search", {
        id_usuario: state,
        titulo: searchValue,
      })
        .then((response) => {
          setProjects(response.data);
          console.log(response);
        })
        .catch((error) => console.log(error));
    } else {
      getProjects();
    }
  }

  function getProjects() {
    Axios.post("http://projetoleia.ddns.net:3001/getprojects", {
      id_usuario: state,
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="homePage">
      <SideMenu state={state} />
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
                className="ft"
                icon={faSearch}
                onClick={searchProjects}
              />
            </div>
            <button
              id="new-doc-button"
              onClick={() => navigate("/work-page", { state: info })}
            >
              Novo Arquivo
            </button>
          </div>
        </div>

        <div className="align-center homepage">
          <div className="cards">
            {projects.length > 0 &&
              projects.map((project) => (
                <BasicCard
                  titulo={project.titulo}
                  preview={project.preview}
                  projectId={project.id}
                  userId={project.id_usuario}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
