import Axios from "axios";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPeopleGroup,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "../../../../css/PagesDesign/teamPage.css";

export default function CardOwner({ owner }) {
  return (
    <div className="card-owner">
      <h1 id="team-owner">Líder:</h1>
      <div className="icon-user">
        <FontAwesomeIcon className="ico" icon={faUser} />
      </div>
      <h1 className="UsersName">{owner}</h1>
      <div className="alignBottom-CardUser">
        <div className="icons proj-card">
          <div className="excluir">
            <FontAwesomeIcon className="ico" id="delete-icon" icon={faTrash} />
          </div>
        </div>
      </div>
    </div>
  );
}
