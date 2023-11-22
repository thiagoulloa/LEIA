import "./style.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import Axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function ProjConfigPage({ notifySuccess }) {
  let navigate = useNavigate();
  const { state } = useLocation();

  const [teams, setTeams] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const [projName, setProjName] = React.useState("");
  const [projDesc, setProjDesc] = React.useState("");

  React.useEffect(() => {
    getTeams();
    getProject();
    setTeamId(0);
  }, []);

  const handleChange = (event) => {
    setTeamId(event.target.value);
  };

  function getTeams() {
    Axios.post("http://projetoleia.ddns.net:3001/getusercreatedteams", {
      userId: state[0].userId,
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

  function getProject() {
    Axios.post("http://projetoleia.ddns.net:3001/getprojectbyid", {
      projectId: state[0].projectId,
    })
      .then((response) => {
        setProjName(response.data[0].titulo);
        setProjDesc(response.data[0].descricao);
        setTeamId(response.data[0].id_teams);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.satus === 500) {
          console.log(error);
        }
      });
  }

  function sendProject() {
    Axios.post("http://projetoleia.ddns.net:3001/sendproject", {
      id_usuario: state[0].userId,
      projectId: state[0].projectId,
      titulo: projName,
      descricao: projDesc,
      teamId: teamId,
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          notifySuccess("Projeto alterado com sucesso!");
          navigate("/home-page", { state: state[0].userId });
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.satus === 500) {
          console.log(error);
        }
      });
  }

  return (
    <div className="projConfigPage">
      <SideMenu state={state[0].userId} />

      <div className="align-top">
        <h1 id="title">Configurações do Projeto</h1>
      </div>
      <div className="align-center-projConfigPage">
        <div className="input-form">
          <label className="label">Nome do Projeto: </label>
          <input
            className="input-projConfigPage"
            value={projName}
            onChange={(e) => setProjName(e.target.value)}
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
      </div>
      <div className="bottom-projConfigPage">
        <button className="newProjectPage-button" onClick={() => sendProject()}>
          Confirmar
        </button>
      </div>
    </div>
  );
}
