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
import {
  BarLoader,
  PulseLoader,
  RotateLoader,
  ScaleLoader,
} from "react-spinners";
import "react-toastify/dist/ReactToastify.css";
import "quill/dist/quill.snow.css";
import TextEditor from "./components/Editor/editor.js";
import TextEnv from "./components/Editor/env.js";
import Editor from "@monaco-editor/react";

function WorkPage({ notifySuccess, notifyError }) {
  let navigate = useNavigate();
  const [btnState, setBtnState] = React.useState(false);

  const [mensagem, setMensagem] = useState("");
  const [airesponse, setAiResponse] = useState("");
  const [answer, setAnswer] = useState("");
  const [content, setContent] = React.useState("");
  const [temperature, setTemperature] = useState(0.3);
  const [funcoesChecked, setFuncoesChecked] = useState("");
  const [variaveisChecked, setVariaveisChecked] = useState("");
  const [parametrosChecked, setParametrosChecked] = useState("");
  const [importacoesChecked, setImportacoesChecked] = useState("");
  const [requisicoesChecked, setRequisicoesChecked] = useState("");

  const { state } = useLocation();

  const [info] = React.useState([
    {
      userId: state[0].userId,
      projectId: state[0].projectId,
      folderId: state[0].folderId,
    },
  ]);

  const client = Axios.create({
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_CHATGPT_KEY}`,
    },
  });

  function openNav() {
    setBtnState((btnState) => !btnState);
    console.log(
      funcoesChecked,
      parametrosChecked,
      variaveisChecked,
      importacoesChecked,
      requisicoesChecked
    );
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
        if (error.response.status === 401 || error.response.status === 500) {
          console.log(error);
        }
      });
  }

  function sendRequest() {
    const prompt = `Documente este código, em portugues brasileiro, separando ${funcoesChecked} ${variaveisChecked} ${parametrosChecked} ${importacoesChecked} ${requisicoesChecked} e explicando: \n\n"${mensagem} `;
    const temp = temperature;
    var loadingbar = document.getElementById("loading-div");

    loadingbar.style.display = "flex";

    const params = {
      model: "gpt-3.5-turbo-16k",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 8192,
      temperature: temp,
    };

    client
      .post("https://api.openai.com/v1/chat/completions", params)
      .then((result) => {
        if (result.status === 200) {
          loadingbar.style.display = "none";
        } else {
          loadingbar.style.display = "none";
          notifyError("API Error");
        }

        setAiResponse(result.data.choices[0].message.content);
      })
      .catch((err) => {
        console.log(err);
        notifyError("API ERROR");
        loadingbar.style.display = "none";
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

  const handleImportacoesChange = (event) => {
    if (importacoesChecked == "") {
      setImportacoesChecked(event.target.value);
    } else {
      setImportacoesChecked("");
    }
  };

  const handleRequisicoesChange = (event) => {
    if (requisicoesChecked == "") {
      setRequisicoesChecked(event.target.value);
    } else {
      setRequisicoesChecked("");
    }
  };

  function Return() {
    if (state[0].folderId) {
      navigate("/folder-page", { state: info });
    } else {
      navigate("/project-page", { state: info });
    }
  }

  function handleProcedureContentChange(text) {
    setMensagem(text);
  }

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
              <FormControlLabel
                control={<Switch value="Importações," />}
                label="Importações"
                className="config-text"
                onChange={handleImportacoesChange}
              />
              <FormControlLabel
                control={<Switch value="Requisições," />}
                label="Requisições"
                className="config-text"
                onChange={handleRequisicoesChange}
              />
            </FormGroup>
          </div>
          <div className="slider">
            <h3 className="config-text">Criatividade da IA</h3>
            <Box sx={{}}>
              <Slider
                aria-label="Temperature"
                defaultValue={0.6}
                getAriaValueText={valuetext}
                onChange={(valuetext) => setTemperature(valuetext.target.value)}
                valueLabelDisplay="auto"
                step={0.1}
                marks
                min={0.1}
                max={1.5}
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
              onClick={Return}
            />

            <div className="container-text code">
              <Editor
                className="mona"
                height="100%"
                defaultLanguage="javascript"
                defaultValue="// Insira seu código aqui"
                value={mensagem}
                onChange={handleProcedureContentChange}
                width="100%"
                theme="vs-dark"
              />
            </div>
            <div className="gpt-gap">
              <button className="workPage-button" onClick={sendRequest}>
                Enviar
              </button>
              <img id="config-button" src={ConfigImage} onClick={openNav}></img>
            </div>
          </div>
          <div className="align-center-workPage">
            <div id="loading-div">
              <ScaleLoader color="rgb(169, 135, 255) " />
            </div>
          </div>

          <React.StrictMode>
            <TextEditor
              className="editor-r"
              projectId={state[0].projectId}
              userId={state[0].user}
              folderId={state[0].folderId}
              docsId={state[0].documentId}
              airesponse={airesponse}
              notifySuccess={notifySuccess}
            />
          </React.StrictMode>
        </div>
      </div>
    </div>
  );
}

export default WorkPage;
