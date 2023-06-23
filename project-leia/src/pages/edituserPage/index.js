import React, { useState, useRef } from "react";
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

  function openNav() {}

  console.log(state);

  return (
    <div className="edituserPage">
      <SideMenu state={state} />
      <div className="containerFormm">
        <div className="userEditContainer">
          <FontAwesomeIcon className="ft" icon={faUser} />
          <h1 id="user-edit-title">Edição de usuário</h1>
        </div>

        <div className="align-center">
          <Formik initialValues={{}}>
            <Form className="useredit-form">
              <div className="usuarioEmail">
                <Field type="text" name="username" className="usuarioInput" />

                <Field type="text" name="email" className="emailInput" />
              </div>
              <Field type="password" name="senhaAT" className="senhaATInput" />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <Field type="password" name="novaSenha" className="senhaInput" />
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
