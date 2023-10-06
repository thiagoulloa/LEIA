import React from "react";
import { useNavigate } from "react-router-dom";
import Instagram from "../../images/Instagram.png";
import linkedin from "../../images/linkedin.png";
import "../../../../css/Components/introPage.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-left"></div>
      <div className="footer-center">
        <div className="TextoFT" style={{ fontFamily: "Space Grotesk" }}>
          <p>Projeto Léia, 2023</p>
        </div>
      </div>

      <div className="footer-right">
        <a href="https://heylink.me/projetoleia/">
          <img className="logo linkedin" src={linkedin}></img>
        </a>
        <img className="logo instagram" src={Instagram}></img>
      </div>
    </div>
  );
}
