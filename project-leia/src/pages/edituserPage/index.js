import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import * as yup from "yup";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "../../components/SideMenu/sidemenu";
import Axios from "axios";

function EditUserPage({ notifySuccess }) {
  let navigate = useNavigate();

  const [userData, setUserData] = React.useState([]);

  const { state } = useLocation();

  React.useEffect(() => {
    getUser();
  }, []);

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Este campo é obrigatório"),

    oldpassword: yup.string().required("Este campo é obrigatório"),
  });

  const handleClickEdit = (values) => {
    Axios.post("http://projetoleia.ddns.net:3001/alter", {
      oldpassword: values.oldpassword,
      id_usuario: state,
      newpassword: values.password,
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          notifySuccess("Senha alterada com sucesso!");
          window.location.reload();
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          //handleFailedEdit();
        }
      });
  };

  function getUser() {
    Axios.post("http://projetoleia.ddns.net:3001/getuser", {
      id_usuario: state,
    })
      .then((response) => {
        if (response.status === 200) {
          setUserData(response.data[0]);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
        }
      });
  }

  return (
    <div className="edituserPage">
      <SideMenu state={state} />
      <div className="containerFormm">
        <div className="userEditContainer">
          <h1 id="user-edit-title">Edição de usuário</h1>
        </div>

        <div className="align-center">
          <Formik
            initialValues={{}}
            validationSchema={validationSchema}
            onSubmit={handleClickEdit}
          >
            <Form className="useredit-form">
              <div className="inputs">
                <div className="usuarioEmail">
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Seu usuario atual: </label>
                    </div>
                    <Field
                      type="text"
                      name="username"
                      className="InputsEDBlock"
                      value={userData.username}
                      disabled
                    />
                  </div>
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Seu email atual: </label>
                    </div>
                    <Field
                      type="text"
                      name="email"
                      className="InputsEDBlock"
                      value={userData.email}
                      disabled
                    />
                  </div>
                </div>

                <label className="alterarLBL">Alterar Senha</label>

                <div className="senhas">
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">
                        Confirme sua senha atual:{" "}
                      </label>
                    </div>

                    <Field
                      type="password"
                      name="oldpassword"
                      className="InputsED"
                    />

                    <ErrorMessage
                      name="oldpassword"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Digite sua nova senha: </label>
                    </div>
                    <Field
                      type="password"
                      name="password"
                      className="InputsED"
                    />

                    <ErrorMessage
                      name="password"
                      component="div"
                      className="error-message"
                    />
                  </div>
                </div>
              </div>

              <button className="BTNalteracao" type="submit">
                Confirmar
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
export default EditUserPage;
