import React from "react";
import MenuButton from "../../images/menubar.png";
import LogoLeia from "../../images/logoleia_arquivo.png";
import { useNavigate } from "react-router-dom";
import "../../index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faFile } from "@fortawesome/free-solid-svg-icons";

export default function SideMenu({ state }) {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  let toggleClassCheck = btnState ? "-open" : "";

  function toggleText() {
    var profiletext = document.getElementById("profile-text");

    if (profiletext.style.display === "flex") {
      profiletext.style.display = "none";
    } else {
      profiletext.style.display = "flex";
    }
  }

  return (
    <div className={`sideMenu${toggleClassCheck}`}>
      <div className="menu-separate">
        <div className="align-top sidemenu">
          <div className="menubutton">
            <img
              src={MenuButton}
              id="menubutton"
              alt="menubutton"
              onClick={() => {
                openNav();
                toggleText();
              }}
            />
          </div>
          <div className="bottom-align">
            <div className="user-container">
              <FontAwesomeIcon
                className="ft"
                icon={faUser}
                onClick={() => navigate("/edituserPage", { state: state })}
              />
              <p className="user" id="profile-text">
                User
              </p>
            </div>
          </div>
        </div>
        <div className="bottom-align">
          <img
            src={LogoLeia}
            className="logo lateral"
            onClick={() => navigate("/home-page", { state: state })}
          ></img>
        </div>
      </div>
    </div>
  );
}
