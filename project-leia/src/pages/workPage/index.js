import React, { useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ConfigImage from "./images/config.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSearch,
  faFile,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

function WorkPage() {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);

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

  function openNav() {
    setBtnState((btnState) => !btnState);
  }

  React.useEffect(() => {
    getProject();
  }, []);

  async function SaveDoc() {
    Axios.post("http://thiagoulloa.ddns.net:3001/savedocs", {
      titulo: title,
      content: content,
      preview: content,
      id_usuario: state[0].user,
    }).then((response) => {
      console.log(response);
    });
  }

  function getProject() {
    Axios.post("http://thiagoulloa.ddns.net:3001/getprojectbyid", {
      projectId: state[0].project,
    })
      .then((response) => {
        setContent(response.data[0].content);
        setTitle(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function sendRequest() {
    const prompt = `Documente este código, separando suas funções, variáveis, e explicando cada uma delas: \n\n"${mensagem}`;

    const params = {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: 0.5,
    };

    client
      .post("https://api.openai.com/v1/completions", params)
      .then((result) => setContent(result.data.choices[0].text))
      .catch((err) => console.log(err));
  }

  let toggleClassCheck = btnState ? "-open" : "";

  // retornar o valor do slider
  function valuetext(value) {
    return `${value}`;
  }

  return (
    <div className="workPage">
      <div className="align-left menu">
        <div className={`configMenu${toggleClassCheck}`}>
          <div className="slider">
            <h3 id="temperature-text">Temperature</h3>
            <Box sx={{}}>
              <Slider
                aria-label="Temperature"
                defaultValue={0.3}
                getAriaValueText={valuetext}
                onChange={(valuetext) => console.log(valuetext.target.value)}
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0.1}
                max={1}
              />
            </Box>
          </div>
        </div>
      </div>
      <div className="workPage-center">
        <div className="align-top">
          <FontAwesomeIcon
            className="ft"
            icon={faArrowLeft}
            onClick={() => navigate("/home-page", { state: state })}
          />
          <input
            className="project-title"
            placeholder="Título do Arquivo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
        </div>
        <div className="containers-div">
          <div className="container-text code">
            <textarea
              type="text"
              className="input-code"
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
            />
            <div className="gpt-gap">
              <button className="glow" onClick={sendRequest}>
                Enviar
              </button>
              <img id="config-button" src={ConfigImage} onClick={openNav}></img>
            </div>
          </div>
          <div className="container-editor">
            <div className="Editor">
              <textarea
                id="document"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="gpt-gap">
              <button className="glow" onClick={SaveDoc}>
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
