import React, { useState, useRef } from "react";
import Axios from "axios";
import JoditEditor from "jodit-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";

function WorkPage() {
  let navigate = useNavigate();

  const editor = useRef(null);
  const [mensagem, setMensagem] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { state } = useLocation();
  const { userId } = state;

  React.useEffect(() => {
    console.log(state);
  }, []);

  async function SaveDoc() {
    Axios.post("http://localhost:3001/projetos", {
      titulo: title,
      content: content,
      id_usuario: state,
    }).then((response) => {
      console.log(response);
    });
  }

  return (
    <div className="workPage">
      <input
        className="project-title"
        placeholder="Título do Arquivo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className="containers-div">
        <div className="container-text code">
          <textarea
            type="text"
            className="input-code"
            value={mensagem}
            onChange={setMensagem}
          />
          <button type="submit" className="glow">
            Enviar
          </button>
        </div>
        <div className="container-editor">
          <div className="Editor">
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1} // tabIndex of textarea
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
          <button className="glow" onClick={SaveDoc}>
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
