import Axios from "axios";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import "../../../../css/PagesDesign/teamPage.css";

export default function CardUser({ userId }) {
  const [username, setUsername] = React.useState("");

  React.useEffect(() => {
    getUsername();
    console.log(userId);
  }, []);

  function getUsername() {
    Axios.post("http://projetoleia.ddns.net:3001/getusernamebyid", {
      userId: userId,
    })
      .then((response) => {
        console.log(response.data[0].username);
        setUsername(response.data[0].username);
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="card-users">
      <div className="icon-user">
        <FontAwesomeIcon className="ico" icon={faUser} />
      </div>
      <h1 className="UsersName">{username}</h1>
    </div>
  );
}
