import React from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import {
  faPeopleGroup,
  faPencilSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ProjectCard({
  titulo,
  preview,
  projectId,
  userId,
  teamId,
  projectOwner,
  notifySuccess,
  getProjects,
}) {
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [info] = React.useState([
    {
      userId: userId,
      projectId: projectId,
      teamId: teamId,
    },
  ]);

  function CheckPermission() {
    if (userId === projectOwner) {
      navigate("/projConfig", { state: info });
    } else {
      console.log("Sem Permissão");
    }
  }

  function DeleteProjects() {
    if (userId === projectOwner) {
      Axios.post("http://projetoleia.ddns.net:3001/deleteProjects", {
        id_usuario: projectOwner,
        id_projects: projectId,
      })
        .then((response) => {
          if (response.status === 200) {
            if (response.data.msg) {
              notifySuccess(response.data.msg);
              getProjects();
            }
            if (response.data.warning) {
              if (response.data.warning === 1) {
                handleClickOpen();
              }
            }
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            console.log(error);
          }
        });
    } else {
      console.log("Sem Permissão");
    }
  }

  function DeleteFullProject() {
    if (userId === projectOwner) {
      Axios.post("http://projetoleia.ddns.net:3001/deletefullproject", {
        id_project: projectId,
      })
        .then((response) => {
          if (response.status === 200) {
            notifySuccess(response.data.msg);
            console.log(response);
            getProjects();
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            console.log(error);
          }
        });
    } else {
      console.log("Sem Permissão");
    }
    handleClose();
  }

  async function GetTeam() {
    try {
      const response = await Axios.post(
        "http://projetoleia.ddns.net:3001/getteambyid",
        {
          teamId: teamId,
        }
      );

      const [infoTpg] = [
        {
          teamId: teamId,
          userId: userId,
          ownerId: response.data[0].id_usuarios,
        },
      ];
      return infoTpg;
    } catch (error) {
      console.error(error);
    }
  }

  const navigateTeamPage = async () => {
    const infoTpg = await GetTeam();

    if (infoTpg) {
      navigate("/team-page", { state: infoTpg });
    }
  };

  return (
    <div className="cardHome">
      <div
        className="proj-card-left"
        onClick={() => navigate("/project-page", { state: info })}
      >
        <div className="Texto">
          <div className="Titulo">{titulo}</div>
          <div className="Desc">{preview}</div>
        </div>
      </div>
      <div className="AlignRight proj-card">
        <div className="icons proj-card">
          <div className="editar">
            <FontAwesomeIcon
              className="ico"
              id="edit-icon"
              icon={faPencilSquare}
              onClick={() => CheckPermission()}
            />
          </div>
          <div className="excluir">
            <FontAwesomeIcon
              className="ico"
              id="delete-icon"
              icon={faTrash}
              onClick={() => DeleteProjects()}
            />
          </div>
          {teamId !== null && (
            <div className="equipe-icon-div">
              <FontAwesomeIcon
                className="ico"
                id="team-icon"
                icon={faPeopleGroup}
                onClick={navigateTeamPage}
              />
            </div>
          )}
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {
            "Este projeto ainda contém documentos. Deseja deletar o projeto com todos seus documentos filhos?"
          }
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Caso o projeto seja deletado, não será possível recuperar nenhum de
            seus antigos arquivos. Certifique-se de que não há documentos
            importantes antes de deletar o projeto.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={DeleteFullProject} autoFocus>
            Deletar Projeto
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
