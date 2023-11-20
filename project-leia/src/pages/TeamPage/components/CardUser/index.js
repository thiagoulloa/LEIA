import Axios from "axios";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPeopleGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../css/PagesDesign/teamPage.css";

export default function CardUser({
  userId,
  teamId,
  ownerId,
  logUserId,
  notifyError,
  notifySuccess,
  GetTeamUsers,
}) {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    getUsername();
    console.log(logUserId, ownerId);
  }, []);

  function getUsername() {
    Axios.post("http://projetoleia.ddns.net:3001/getusernamebyid", {
      userId: userId,
    })
      .then((response) => {
        setUsername(response.data[0].username);
      })
      .catch((error) => console.log(error));
  }

  function deleteUser() {
    if (logUserId === ownerId) {
      Axios.post("http://projetoleia.ddns.net:3001/removeuserfromteam", {
        userId: userId,
        teamId: teamId,
      })
        .then((response) => {
          if (response.status === 200) {
            notifySuccess(response.data.msg);
            GetTeamUsers();
          }
          console.log(response);
        })
        .catch((error) => console.log(error));
    } else {
      notifyError("Você não possui permissão para remover usuários");
    }
  }

  return (
    <div className="card-users">
      <div className="icon-user">
        <FontAwesomeIcon className="ico" icon={faUser} />
      </div>
      <h1 className="UsersName">{username}</h1>
      <div className="alignBottom-CardUser">
        <div className="icons proj-card">
          <div className="excluir">
            <FontAwesomeIcon
              className="ico"
              id="delete-icon"
              icon={faTrash}
              onClick={() => deleteUser()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
