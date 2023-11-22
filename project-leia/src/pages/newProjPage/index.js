import "../../css/PagesDesign/newProjPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "../../images/arrow-icon.svg";
import Axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
export default function NewProjPage({ notifySuccess }) {
  let navigate = useNavigate();

  const [projectName, setProjectName] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const [teams, setTeams] = React.useState("");
  const [projDesc, setProjDesc] = React.useState("");

  const { state } = useLocation();

  React.useEffect(() => {
    console.log(state);
    setTeamId(0);
    getTeams();
  }, []);

  const handleChange = (event) => {
    setTeamId(event.target.value);
  };

  function sendProject() {
    Axios.post("http://projetoleia.ddns.net:3001/sendproject", {
      id_usuario: state,
      titulo: projectName,
      descricao: projDesc,
      teamId: teamId,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/home-page", { state: state });
          notifySuccess("Projeto criado com sucesso");
          console.log(response);
        }
      })
      .catch((error) => {
        if (
          error.response.status === 401 ||
          error.response.satus === 500 ||
          error.response.satus === 400
        ) {
          console.log(error);
        }
      });
  }

  function getTeams() {
    Axios.post("http://projetoleia.ddns.net:3001/getusercreatedteams", {
      userId: state,
    })
      .then((response) => {
        setTeams(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.satus === 500) {
          console.log(error);
        }
      });
  }

  return (
    <div className="projConfigPage">
      <SideMenu state={state} />

      <div className="align-top">
        <h1 id="title">Crie do Projeto</h1>
      </div>
      <div className="align-center-projConfigPage">
        <div className="input-form">
          <label className="label">Nome do Projeto: </label>
          <input
            className="input-projConfigPage"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          ></input>
        </div>
        <div className="input-form">
          <label className="label">Descrição do projeto: </label>
          <textarea
            className="input-projConfigPage desc"
            value={projDesc}
            onChange={(e) => setProjDesc(e.target.value)}
          ></textarea>
        </div>
        <div className="collab-projConfigPage">
          <FormControl sx={{ m: 1, minWidth: 250 }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Equipe
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={teamId}
              onChange={handleChange}
              autoWidth
              label="Equipe"
            >
              <MenuItem value={0}>
                <em>Nenhuma</em>
              </MenuItem>

              {teams.length > 0 &&
                teams.map((team) => (
                  <MenuItem value={team.id} key={team.id}>
                    {team.titulo}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div className="bottom-projConfigPage">
          <button
            className="newProjectPage-button"
            onClick={() => sendProject()}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
