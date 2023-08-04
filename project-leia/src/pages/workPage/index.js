import React, { useState, useRef } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ConfigImage from "./images/config.png";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Switch } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import "./style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";

function WorkPage() {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);

  const [mensagem, setMensagem] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [answer, setAnswer] = useState("");
  const [temperature, setTemperature] = useState(0.3);
  const [funcoesChecked, setFuncoesChecked] = useState("");
  const [variaveisChecked, setVariaveisChecked] = useState("");
  const [parametrosChecked, setParametrosChecked] = useState("");

  const { state } = useLocation();

  const [info] = React.useState([
    {
      user: state[0].user,
      projectId: state[0].projectId,
    },
  ]);

  const client = Axios.create({
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}`,
    },
  });

  function openNav() {
    setBtnState((btnState) => !btnState);
    console.log(funcoesChecked, parametrosChecked, variaveisChecked);
  }

  React.useEffect(() => {
    getDocument();
    console.log(state);
  }, []);

  async function SaveDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/savedocs", {
      titulo: title,
      content: content,
      preview: content,
      id_project: state[0].projectId,
    }).then((response) => {
      console.log(response);
    });
  }

  function getDocument() {
    Axios.post("http://projetoleia.ddns.net:3001/getdocumentbyid", {
      documentId: state[0].documentId,
    })
      .then((response) => {
        setContent(response.data[0].content);
        setTitle(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function sendRequest() {
    const prompt = `Documente este código, separando ${funcoesChecked} ${variaveisChecked} ${parametrosChecked} e explicando: \n\n"${mensagem}`;
    const temp = temperature;

    const params = {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 1000,
      temperature: temp,
    };

    client
      .post("https://api.openai.com/v1/completions", params)
      .then((result) => setContent(result.data.choices[0].text))
      .catch((err) => console.log(err));
  }

  function deleteDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/deletecard", {
      id_project: state[0].projectId,
      id_card: state[0].documentId,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/project-page", { state: state });
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
        }
      });
  }

  let toggleClassCheck = btnState ? "-open" : "";

  // retornar o valor do slider
  function valuetext(value) {
    return `${value}`;
  }

  // Funções Filtros
  const handleFuncoesChange = (event) => {
    if (funcoesChecked == "") {
      setFuncoesChecked(event.target.value);
    } else {
      setFuncoesChecked("");
    }
  };

  const handleVariaveisChange = (event) => {
    if (variaveisChecked == "") {
      setVariaveisChecked(event.target.value);
    } else {
      setVariaveisChecked("");
    }
  };

  const handleParametrosChange = (event) => {
    if (parametrosChecked == "") {
      setParametrosChecked(event.target.value);
    } else {
      setParametrosChecked("");
    }
  };

  return (
    <div className="workPage">
      <div className="align-left menu">
        <div className={`configMenu${toggleClassCheck}`}>
          <div className="filtros-div">
            <h3 className="config-text">Filtros</h3>
            <FormGroup>
              <FormControlLabel
                control={<Switch value="Funções," />}
                label="Funções"
                className="config-text"
                value={"funções"}
                onChange={handleFuncoesChange}
              />
              <FormControlLabel
                control={<Switch value="Variáveis," />}
                label="Variáveis"
                className="config-text"
                onChange={handleVariaveisChange}
              />
              <FormControlLabel
                control={<Switch value="Parâmetros," />}
                label="Parâmetros"
                className="config-text"
                onChange={handleParametrosChange}
              />
            </FormGroup>
          </div>
          <div className="slider">
            <h3 className="config-text">Temperature</h3>
            <Box sx={{}}>
              <Slider
                aria-label="Temperature"
                defaultValue={0.3}
                getAriaValueText={valuetext}
                onChange={(valuetext) => setTemperature(valuetext.target.value)}
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
        <div className="containers-div">
          <div className="align-left workpage">
            <FontAwesomeIcon
              className="ft"
              id="return-button"
              icon={faArrowLeft}
              onClick={() => navigate("/project-page", { state: info })}
            />
            <div className="container-text code">
              <textarea
                type="text"
                className="input-code"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
              />
            </div>
            <div className="gpt-gap">
              <button className="glow" onClick={sendRequest}>
                Enviar
              </button>
              <img id="config-button" src={ConfigImage} onClick={openNav}></img>
            </div>
          </div>
          <div className="align-right workpage">
            <input
              className="project-title"
              placeholder="Título do Arquivo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></input>
            <div className="container-editor">
              <div className="Editor">
                <textarea
                  id="document"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="gpt-gap">
              <button className="glow" onClick={SaveDoc}>
                Salvar
              </button>
              <FontAwesomeIcon
                icon={faTrash}
                className="ico"
                onClick={deleteDoc}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
