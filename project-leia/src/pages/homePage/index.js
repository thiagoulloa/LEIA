import React from "react";
import MenuButton from "./images/menubar.png";
import LogoLeia from "../../images/logoleia_arquivo.png";
import BasicCard from "./components/Card";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default function HomePage() {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);
  const [projects, setProjects] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  const { state } = useLocation();
  const { userId } = state;

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  React.useEffect(() => {
    console.log(state);
    getProjects();
  }, []);

  /* React.useEffect(() => {
    getProjects();
  }, [searchValue]); */

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
                <FontAwesomeIcon className="ft" icon={faUser} />
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
            <input
              className="search-docs"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            ></input>
            <button
              id="new-doc-button"
              onClick={() => navigate("/work-page", { state: state })}
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
                userId={state}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
