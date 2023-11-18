import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import React from "react";

export default function InviteCard({
  id,
  id_time,
  id_destinatario,
  id_remetente,
  userId,
}) {
  let navigate = useNavigate();

  const [remetente, setRemetente] = React.useState("");
  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    GetRemetente();
    getTime();
  }, []);

  function getTime() {
    Axios.post("http://projetoleia.ddns.net:3001/getteambyid", {
      teamIdInvite: id_time,
    })
      .then((response) => {
        setTime(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function GetRemetente() {
    Axios.post("http://projetoleia.ddns.net:3001/getuser", {
      id_remetente: id_remetente,
    })
      .then((response) => {
        setRemetente(response.data[0].username);
      })
      .catch((error) => console.log(error));
  }

  function SendResponse(value) {
    Axios.post("http://projetoleia.ddns.net:3001/inviteresponse", {
      response: value,
      inviteId: id,
      teamId: id_time,
      userId: id_destinatario,
    })
      .then((response) => {
        console.log(response);
        window.location.reload();
      })
      .catch((error) => console.log(error));
  }

  return (
    <div className="invite-card">
      <p className="invite-text">
        {remetente} te convidou para: {time}
      </p>
      <FontAwesomeIcon
        className="accept-icon"
        icon={faCheck}
        onClick={() => SendResponse(1)}
      />
      <FontAwesomeIcon
        className="deny-icon"
        icon={faXmark}
        onClick={() => SendResponse(2)}
      />
    </div>
  );
}
