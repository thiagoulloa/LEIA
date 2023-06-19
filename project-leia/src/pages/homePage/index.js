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

export default function HomePage() {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const { state } = useLocation();
  const { userId } = state;

  const [info] = React.useState([
    {
      user: state,
    },
  ]);

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  React.useEffect(() => {
    getProjects();
  }, []);

  function searchProjects() {
    if (searchValue.length >= 1) {
      Axios.post("http://localhost:3001/search", {
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
    Axios.post("http://localhost:3001/getprojects", {
      id_usuario: state,
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }

  let toggleClassCheck = btnState ? "-open" : "";

  return (
    <div className="homePage">
      <div className={`sideMenu${toggleClassCheck}`}>
        <div className="menu-separate">
          <div className="top-align">
            <div className="menubutton">
              <img
                src={MenuButton}
                id="menubutton"
                alt="menubutton"
                onClick={() => {
                  openNav();
                }}
              />
            </div>
            <div className="bottom-align">
              <div className="user-container">
                <FontAwesomeIcon
                  className="ft"
                  icon={faUser}
                  onClick={() => navigate("/edituserPage")}
                />
                <p className="user">User</p>
              </div>
            </div>
          </div>
          <div className="bottom-align">
            <img
              src={LogoLeia}
              className="logo lateral"
              onClick={() => navigate("/")}
            ></img>
          </div>
        </div>
      </div>
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
  );
}
