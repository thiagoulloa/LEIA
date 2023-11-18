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
export default function NewProjPage() {
  let navigate = useNavigate();

  const [projectName, setProjectName] = React.useState("");
  const [teamId, setTeamId] = React.useState("");
  const [teams, setTeams] = React.useState("");
  const [projDesc, setProjDesc] = React.useState("");
  const [collaborators, setCollaborators] = React.useState("");

  const { state } = useLocation();

  React.useEffect(() => {
    console.log(state);
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
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.satus === 500) {
          console.log(error);
        }
      });
  }

  function getTeams() {
    Axios.post("http://projetoleia.ddns.net:3001/getusercreatedteams", {
      userId: state,
    })
      .then((response) => {
        console.log(response);
        setTeams(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.satus === 500) {
          console.log(error);
        }
      });
  }

  return (
    <div className="newProjPage">
      <SideMenu state={state} />

      <div className="align-top-new-project-page">
        <h1 id="title">Configure seu projeto</h1>
      </div>
      <div className="align-center">
        <Formik initialValues={{}} onSubmit={sendProject}>
          <Form className="projConfig-form">
            <div className="input-div">
              <label className="label">Nome do Projeto: </label>
              <Field
                type="textarea"
                name="projName"
                className="inputsForm"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label className="label">Descrição do projeto: </label>
              <Field
                type="text"
                name="projDesc"
                className="inputsForm desc"
                value={projDesc}
                onChange={(e) => setProjDesc(e.target.value)}
                component="textarea"
                id="desc"
              />
            </div>
            <div className="input-div">
              <div className="collab-div">
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
                    <MenuItem value="">
                      <em>Nenhuma</em>
                    </MenuItem>

                    {teams.length > 0 &&
                      teams.map((team) => (
                        <MenuItem value={team.id}>{team.titulo}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </div>
            </div>
            <button className="glow" type="submit">
              Confirmar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
