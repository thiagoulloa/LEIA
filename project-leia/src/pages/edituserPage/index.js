import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch } from "@fortawesome/free-solid-svg-icons";
import SideMenu from "../../components/SideMenu/sidemenu";
import Axios from "axios";

function EditUserPage() {
  let navigate = useNavigate();

  const { state } = useLocation();

  return (
    <div className="edituserPage">
      <SideMenu state={state} />
      <div className="containerFormm">
        <div className="userEditContainer">
          <h1 id="user-edit-title">Edição de usuário</h1>
        </div>

        <div className="align-center">
          <Formik initialValues={{}}>
            <Form className="useredit-form">
              <div className="inputs">
                <div className="usuarioEmail">
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Seu usuario atual: </label>
                    </div>
                    <Field type="text" name="username" className="InputsED" />
                  </div>
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Seu email atual: </label>
                    </div>
                    <Field type="text" name="email" className="InputsED" />
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
                      name="senhaAT"
                      className="InputsED"
                    />
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="error-message"
                  />
                  <div className="conjunto">
                    <div className="alignLeft">
                      <label className="labels">Digite sua nova senha: </label>
                    </div>
                    <Field
                      type="password"
                      name="novaSenha"
                      className="InputsED"
                    />
                  </div>
                </div>
              </div>
              <ErrorMessage
                name="confirmedpassword"
                component="div"
                className="error-message"
              />

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
