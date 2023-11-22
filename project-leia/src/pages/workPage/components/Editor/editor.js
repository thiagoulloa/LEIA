import React from "react";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { faArrowLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./style.css";
import { ClockLoader } from "react-spinners";

export default function TextEditor({
  docsId,
  airesponse,
  projectId,
  userId,
  folderId,
  notifySuccess,
}) {
  let navigate = useNavigate();

  const [title, setTitle] = React.useState("");
  const [NewContent, setNewContent] = React.useState("");
  const [editorText, setEditorText] = React.useState("");

  const [info] = React.useState([
    {
      userId: userId,
      projectId: projectId,
    },
  ]);

  React.useEffect(() => {
    if (docsId) {
      getDocument();
    }
  }, []);

  React.useEffect(() => {
    if (airesponse) {
      const formattedResponse = airesponse.replace(/\n/g, "<br>");
      handleProcedureContentChange(formattedResponse);
    }
  }, [airesponse]);

  async function SaveDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/savedocs", {
      titulo: title,
      content: NewContent,
      preview: NewContent,
      docsId: docsId,
      id_project: projectId,
      folderId: folderId,
    }).then((response) => {
      if (response.status === 200) {
        notifySuccess("Documento salvo com sucesso!");
      }
    });
  }

  function getDocument() {
    Axios.post("http://projetoleia.ddns.net:3001/getdocumentbyid", {
      documentId: docsId,
    })
      .then((response) => {
        setNewContent(response.data[0].content);
        setEditorText(response.data[0].content);
        setTitle(response.data[0].titulo);
      })
      .catch((error) => console.log(error));
  }

  function deleteDoc() {
    Axios.post("http://projetoleia.ddns.net:3001/deletecard", {
      id_project: projectId,
      id_card: docsId,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/project-page", { state: info });
          notifySuccess("Documento deletado com sucesso!");
          console.log(response);
        }
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 500) {
          console.log(error);
        }
      });
  }

  var modules = {
    toolbar: [
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
        { align: [] },
      ],
      [
        {
          color: [
            "#000000",
            "#e60000",
            "#ff9900",
            "#ffff00",
            "#008a00",
            "#0066cc",
            "#9933ff",
            "#ffffff",
            "#facccc",
            "#ffebcc",
            "#ffffcc",
            "#cce8cc",
            "#cce0f5",
            "#ebd6ff",
            "#bbbbbb",
            "#f06666",
            "#ffc266",
            "#ffff66",
            "#66b966",
            "#66a3e0",
            "#c285ff",
            "#888888",
            "#a10000",
            "#b26b00",
            "#b2b200",
            "#006100",
            "#0047b2",
            "#6b24b2",
            "#444444",
            "#5c0000",
            "#663d00",
            "#666600",
            "#003700",
            "#002966",
            "#3d1466",
            "custom-color",
          ],
        },
      ],
    ],
  };

  var formats = [
    "header",
    "height",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "color",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "size",
  ];

  function handleProcedureContentChange(text) {
    setNewContent(text);
    setEditorText(text);
  }

  return (
    <div className="align-right workpage">
      <input
        className="project-title"
        placeholder="Título do Arquivo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></input>
      <div className="container-editor">
        <div className="Editor">
          <div
            id="quill-editor-container"
            style={{ display: "grid", justifyContent: "center" }}
          >
            <ReactQuill
              className="quill"
              theme="snow"
              modules={modules}
              formats={formats}
              value={editorText}
              placeholder=""
              onChange={handleProcedureContentChange}
            ></ReactQuill>
          </div>
        </div>
      </div>
      <div className="gpt-gap">
        <button className="workPage-button" onClick={() => SaveDoc()}>
          Salvar
        </button>
        <FontAwesomeIcon icon={faTrash} className="ico" />
      </div>
    </div>
  );
}
