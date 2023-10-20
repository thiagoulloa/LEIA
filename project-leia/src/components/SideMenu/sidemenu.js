import React from "react";
import MenuButton from "../../images/menubar.png";
import LogoLeia from "../../images/logoleia_arquivo.png";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faUsers,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

export default function SideMenu({ state }) {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);
  const [username, setUsername] = React.useState("");

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  React.useEffect(() => {
    getUser();
  }, []);

  function getUser() {
    Axios.post("http://projetoleia.ddns.net:3001/getuser", {
      id_usuario: state,
    })
      .then((response) => {
        if (response.status === 200) {
          setUsername(response.data[0].username);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
        }
      });
  }

  let toggleClassCheck = btnState ? "-open" : "";

  function toggleText() {
    var profiletext = document.getElementById("profile-text");
    var hometext = document.getElementById("home-text");
    var equipetext = document.getElementById("equipe-text");
    var usertext = document.getElementById("user-text");

    if (usertext.style.display === "flex") {
      usertext.style.display = "none";
    } else {
      usertext.style.display = "flex";
    }

    if (profiletext.style.display === "flex") {
      profiletext.style.display = "none";
    } else {
      profiletext.style.display = "flex";
    }

    if (hometext.style.display === "flex") {
      hometext.style.display = "none";
    } else {
      hometext.style.display = "flex";
    }

    if (equipetext.style.display === "flex") {
      equipetext.style.display = "none";
    } else {
      equipetext.style.display = "flex";
    }
  }

  return (
    <div className={`sideMenu${toggleClassCheck}`}>
      <div className="menu-separate">
        <div className="align-top sidemenu">
          <div className="align-left">
            <div className="menu-container">
              <div className="icon-div menu">
                <FontAwesomeIcon
                  className="ico"
                  icon={faBars}
                  onClick={() => {
                    openNav();
                    toggleText();
                  }}
                />
              </div>
              <p className="icons-text" id="user-text">
                Olá {username}
              </p>
            </div>

            <div className="bottom-align">
              <div className="user-container">
                <div className="icon-div menu">
                  <FontAwesomeIcon
                    className="ico"
                    icon={faUser}
                    onClick={() => navigate("/edituserPage", { state: state })}
                  />
                </div>
                <p className="icons-text" id="profile-text">
                  Edição de usuário
                </p>
              </div>
            </div>
            <div className="bottom-align">
              <div className="home-container">
                <div className="icon-div menu">
                  <FontAwesomeIcon
                    className="ico"
                    icon={faHome}
                    onClick={() => navigate("/Home-Page", { state: state })}
                  />
                </div>
                <p className="icons-text" id="home-text">
                  Home Page
                </p>
              </div>
            </div>
            <div className="bottom-align">
              <div className="home-container">
                <div className="icon-div menu">
                  <FontAwesomeIcon
                    className="ico"
                    icon={faUsers}
                    onClick={() => navigate("/teams-page", { state: state })}
                  />
                </div>
                <p className="icons-text" id="equipe-text">
                  Criação de equipes
                </p>
              </div>
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
  );
}
