import React from "react";
import LogoLeia from "../../images/expand-icon.png"
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
            src={LogoLeia}
            id="menubutton"
            alt="menubutton"
            onClick={() => {
              openNav();
            }}
          />
        </div>
        </div>
            <h1>Olá Mundo</h1>
            </div>
        
    );
}