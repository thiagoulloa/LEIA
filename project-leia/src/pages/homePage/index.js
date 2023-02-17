import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function HomePage() {
  let navigate = useNavigate();

  return (
    <div className="Home">
      <div className="homeBar">
        <div className="alignLeft"></div>
        <div className="alignRight">
          <p id="teste">Teste</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
