import Axios from "axios";
import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import "../../../../css/PagesDesign/teamPage.css";

export default function CardProjects({ titulo, desc }) {
  return (
    <div className="card-team-projects">
      <p id="project-titulo-teampage">{titulo}</p>{" "}
      <p id="project-desc-teampage">{desc}</p>
    </div>
  );
}
