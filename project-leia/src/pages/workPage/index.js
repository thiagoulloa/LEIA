import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function WorkPage() {
  let navigate = useNavigate();

  const [mensagem, setMensagem] = useState("");
  const [mensagensEnviadas, setMensagensEnviadas] = useState([]);

  function handleChange(event) {
    setMensagem(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    enviarMensagem(mensagem);
    setMensagem("");
  }

  function enviarMensagem(mensagem) {
    setMensagensEnviadas([...mensagensEnviadas, mensagem]);
  }

  return (
    <div className="workPage">
      <div className="containers-div">
        <div className="container-text code">
          {mensagensEnviadas.map((mensagem, index) => (
            <div key={index} className="mensagem">
              {mensagem}
            </div>
          ))}
        </div>
        <div className="container-text doc"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <input type="text" value={mensagem} onChange={handleChange} />
        <button type="submit" className="glow">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default WorkPage;
