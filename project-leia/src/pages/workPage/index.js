import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

function Chat() {
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
    <div>
      <div className="container-mensagens">
        {mensagensEnviadas.map((mensagem, index) => (
          <div key={index} className="mensagem">
            {mensagem}
          </div>
        ))}
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

function WorkPage() {
  let navigate = useNavigate();

  return (
    <div className="workPage">
      <div className="containerWork">
        <div className="logoDivWork">
          <Chat />
        </div>
        <div className="align-center"></div>
      </div>
    </div>
  );
}

export default WorkPage;
