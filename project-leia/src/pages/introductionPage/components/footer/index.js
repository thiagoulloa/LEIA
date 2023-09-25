import React from "react";
import { useNavigate } from "react-router-dom";
import Instagram from "../../images/Instagram.png";
import linkedin from "../../images/linkedin.png";
import "../../../../css/Components/introPage.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="TextoFT" style={{ fontFamily: "Space Grotesk" }}>
        <p>© 2023 Todos os direitos reservados, Projeto Léia®</p>
      </div>

      <div className="AlignRight_footer">
        <a href="https://heylink.me/projetoleia/">
          <img className="logo linkedin" src={linkedin}></img>
        </a>
        <img className="logo instagram" src={Instagram}></img>
      </div>
    </div>
  );
}
