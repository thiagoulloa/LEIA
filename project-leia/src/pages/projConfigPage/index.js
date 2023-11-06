import "./style.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import { Formik, Form, Field, ErrorMessage } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ProjConfigPage() {
  const { state } = useLocation();
  return (
    <div className="projConfigPage">
      <SideMenu state={state[0].user} />

      <div className="align-top">
        <h1 id="title">Configurações do Projeto</h1>
      </div>
      <div className="align-center">
        <Formik initialValues={{}}>
          <Form className="projConfig-form">
            <div className="input-form">
              <label className="label">Nome do Projeto: </label>
              <Field type="textarea" name="projName" className="InputsED" />
            </div>
            <div className="input-form">
              <label className="label">Descrição do projeto: </label>
              <Field
                type="text"
                name="projDesc"
                className="InputsED desc"
                component="textarea"
                id="desc"
              />
            </div>
            <button className="glow" type="submit">
              Confirmar
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
