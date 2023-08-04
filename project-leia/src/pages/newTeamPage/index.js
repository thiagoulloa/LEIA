import "./style.css";
import SideMenu from "../../components/SideMenu/sidemenu";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function NewTeamPage() {
  return (
    <div className="newTeamPage">
      <SideMenu />

      <div className="align-top">
        <h1 id="title">Crie uma equipe</h1>
      </div>
      <div className="align-center">
        <Formik initialValues={{}}>
          <Form className="projConfig-form">
            <div className="input-form">
              <label className="label">Nome da Equipe: </label>
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
