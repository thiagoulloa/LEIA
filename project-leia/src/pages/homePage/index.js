import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./components/Card";
import Axios from "axios";
import SideMenu from "../../components/SideMenu/sidemenu";

export default function HomePage() {
  let navigate = useNavigate();

  const { state } = useLocation();

  const [projects, setProjects] = React.useState("");

  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    getProjects();
    console.log(state);

    if (!state) {
      navigate("/");
    }
  }, []);

  function getProjects() {
    Axios.post("http://projetoleia.ddns.net:3001/getprojects", {
      id_usuario: state,
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }

  function SearchProject() {
    if (searchValue.length >= 1) {
      Axios.post("http://projetoleia.ddns.net:3001/searchproject", {
        titulo: searchValue,
        user_id: state,
      })
        .then((response) => {
          setProjects(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      getProjects();
    }
  }

  return (
    <div className="PrehomePage">
      <SideMenu state={state} />
      <div className="Inputs">
        <div className="home-top">
          <div className="search-div projects">
            <input
              className="search-docs"
              id="search-input"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <FontAwesomeIcon
              className="busca"
              icon={faSearch}
              onClick={() => SearchProject()}
            />
          </div>
          <button
            className="new-button"
            onClick={() => navigate("/new-project", { state: state })}
          >
            Novo Projeto
          </button>
        </div>

        <div className="cards projects">
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectCard
                titulo={project.titulo}
                preview={project.descricao}
                projectId={project.id}
                userId={state}
                projectOwner={project.id_usuario}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
