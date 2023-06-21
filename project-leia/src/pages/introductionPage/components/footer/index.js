import React from "react";
import { useNavigate } from "react-router-dom";
import Instagram from "../../images/Instagram.png";
import linkedin from "../../images/linkedin.png";
import "../../style.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="cardF">
        <div className="alignLeft"></div>

        <div className="alignCenter">
          <div style={{ fontFamily: "Space Grotesk" }}>
            <p className="TextoFT">
              © 2023 Todos os direitos reservados, Projeto Léia®
            </p>
          </div>
        </div>
        <div className="alignRight">
          <a href="https://heylink.me/projetoleia/">
            <img className="logo linkedin" src={linkedin}></img>
          </a>
          <img className="logo instagram" src={Instagram}></img>
        </div>
      </div>
    </div>
  );
}
