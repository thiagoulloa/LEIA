import React from "react";
import MenuButton from "./images/menubar.png";
import BasicCard from "./components/Card";
import "./style.css";

export default function HomePage() {
  const [btnState, setBtnState] = React.useState(false);

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  let toggleClassCheck = btnState ? "-open" : "";

  return (
    <div className="homePage">
      <div className={`sideMenu${toggleClassCheck}`}>
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
      </div>
      <div className="content homePage">
        <h1 id="title-home">Seus Arquivos:</h1>
        <div className="cards">
          <BasicCard />
          <BasicCard />
          <BasicCard />
        </div>
      </div>
    </div>
  );
}
