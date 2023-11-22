import "../../css/PagesDesign/teamPage.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import CardUser from "./components/CardUser";
import CardProjects from "./components/CardProjects";
import CardOwner from "./components/CardOwner";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TeamPage({
  notifySuccess,
  notifyError,
  notifyWarning,
}) {
  let navigate = useNavigate();

  const [teamName, setTeamName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [projects, setProjects] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [lider, setLider] = React.useState("");
  const [users, setUsers] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { state } = useLocation();

  React.useEffect(() => {
    GetTeamUsers();
    GetTeamName();
    GetTeamOwner();
    getTeamProjects();
    console.log(state);
  }, []);

  function AddUserIntoTeam() {
    if (state.userId === state.ownerId) {
      Axios.post("http://projetoleia.ddns.net:3001/sendteaminvite", {
        teamId: state.teamId,
        email: email,
        remetenteId: state.userId,
      })
        .then((response) => {
          if (response.status === 200) {
            notifySuccess("Convite enviado");
            setEmail("");
          }
          console.log(response);
        })
        .catch((error) => {
          notifyError(error.response.data);
          console.log(error);
        });
    } else {
      notifyWarning("Você não tem permissão para adicionar usuários");
    }
  }

  function GetTeamUsers() {
    Axios.post("http://projetoleia.ddns.net:3001/getuserbyteamid", {
      id_time: state.teamId,
    })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error));
  }

  function GetTeamOwner() {
    Axios.post("http://projetoleia.ddns.net:3001/getteamowner", {
      teamId: state.teamId,
    })
      .then((response) => {
        setLider(response.data[0].username);
      })
      .catch((error) => console.log(error));
  }

  function GetTeamName() {
    Axios.post("http://projetoleia.ddns.net:3001/getteambyid", {
      teamId: state.teamId,
    })
      .then((response) => {
        setTitulo(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function getTeamProjects() {
    Axios.post("http://projetoleia.ddns.net:3001/getteamprojects", {
      teamId: state.teamId,
    })
      .then((response) => {
        setProjects(response.data);
      })
      .catch((error) => console.log(error));
  }

  function DeleteTeam() {
    if (state.userId === state.ownerId) {
      Axios.post("http://projetoleia.ddns.net:3001/deleteteam", {
        teamId: state.teamId,
        userId: state.userId,
      })
        .then((response) => {
          notifySuccess(response.data.msg);
          navigate("/teams-page", { state: state.userId });
        })
        .catch((error) => console.log(error));
    } else {
      notifyWarning("Você não tem permissão para deletar esta equipe");
    }
  }

  function leaveTeam() {
    if (state.userId === state.ownerId) {
      notifyWarning("O líder de uma equipe não pode ser removido");
    } else {
      Axios.post("http://projetoleia.ddns.net:3001/removeuserfromteam", {
        userId: state.userId,
        teamId: state.teamId,
      })
        .then((response) => {
          if (response.status === 200) {
            notifySuccess(response.data.msg);
            navigate("/teams-page", { state: state.userId });
          }
          console.log(response);
        })
        .catch((error) => console.log(error));
    }
  }

  return (
    <div className="team-page">
      <SideMenu state={state.userId} />
      <div className="team-page-team">
        <div className="teams-page-top">
          <FontAwesomeIcon className="teamicontm" icon={faPeopleGroup} />
          <h1 className="title-team">{titulo}</h1>
        </div>

        <div className="users-projects">
          <div className="container-left-teampage">
            <h1 className="title">Colaboradores:</h1>

            <div className="container-carduser">
              <CardOwner owner={lider} />
              {users.length > 0 &&
                users.map((user) => (
                  <CardUser
                    userId={user.ID_usuario}
                    key={user.ID_usuario}
                    teamId={state.teamId}
                    ownerId={state.ownerId}
                    logUserId={state.userId}
                    notifyError={notifyError}
                    notifySuccess={notifySuccess}
                    GetTeamUsers={GetTeamUsers}
                  />
                ))}
            </div>
            <div className="team-page-bottom">
              <h2 className="title">Adicionar Colaboradores:</h2>
              <div className="add-colab-container">
                <input
                  className="input-colab"
                  placeholder="E-mail do colaborador"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <FontAwesomeIcon
                  className="add-colab-icon"
                  icon={faPaperPlane}
                  onClick={() => AddUserIntoTeam()}
                />
              </div>
            </div>
          </div>
          <div className="container-right-teampage">
            <h1 className="title">Projetos da Equipe:</h1>
            <div className="container-projects">
              {projects.length > 0 &&
                projects.map((project) => (
                  <CardProjects
                    titulo={project.titulo}
                    desc={project.descricao}
                    key={project.id}
                  />
                ))}
            </div>
            <div className="team-page-bottom-right">
              <button
                className="deleteTeam-button"
                onClick={() => handleClickOpen()}
              >
                DELETAR TIME
              </button>
              <FontAwesomeIcon
                className="ico"
                id="leave-icon-tpg"
                icon={faRightFromBracket}
                onClick={() => leaveTeam()}
              />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Deseja mesmo deletar esta equipe?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Uma vez deletada por acidente, será necessário convidar novamente
            usuários presentes nela. Além disso, seu histórico de convites será
            deletado.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={DeleteTeam} autoFocus>
            Deletar Equipe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
