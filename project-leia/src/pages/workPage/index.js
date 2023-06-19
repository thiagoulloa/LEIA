import React, { useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";

function WorkPage() {
  let navigate = useNavigate();

  const editor = useRef(null);
  const [mensagem, setMensagem] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");

  const { state } = useLocation();

  const client = Axios.create({
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}`,
    },
  });

  React.useEffect(() => {
    console.log(state);
    getProject();
  }, []);

  async function SaveDoc() {
    Axios.post("http://localhost:3001/savedocs", {
      titulo: title,
      content: content,
      preview: content,
      id_usuario: state[0].user,
    }).then((response) => {
      console.log(response);
    });
  }

  function getProject() {
    Axios.post("http://localhost:3001/getprojectbyid", {
      projectId: state[0].project,
    })
      .then((response) => {
        setContent(response.data[0].content);
        setTitle(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function sendRequest() {
    const prompt = `Documente este código separando e explicando suas funções: \n\n"${mensagem}`;

    const params = {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.7,
    };

    client
      .post("https://api.openai.com/v1/completions", params)
      .then((result) => setContent(result.data.choices[0].text))
      .catch((err) => console.log(err));
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
            onChange={(e) => setMensagem(e.target.value)}
          />
          <button className="glow" onClick={sendRequest}>
            Enviar
          </button>
        </div>
        <div className="container-editor">
          <div className="Editor">
            <textarea
              id="document"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
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
