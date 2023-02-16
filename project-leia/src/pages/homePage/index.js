import React from "react";
import "./style.css";
import Gustavo from "./images/sanches.png";

function HomePage() {
  return (
    <div className="Home">
      <h1>Se o TCC der errado é culpa dele:</h1>
      <img id="imagem" src={Gustavo} />
    </div>
  );
}

export default HomePage;
