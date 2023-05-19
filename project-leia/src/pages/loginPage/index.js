import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../../images/logoleia.png";
import * as yup from "yup";
import Axios from "axios";

function LoginPage() {
  let navigate = useNavigate();
  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/Login", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        navigate("/home-page");
      }
    });
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Este campo é obrigatório"),
  });

  return (
    <div className="loginPage">
      <div className="containerLogin">
        <div className="logoDivLogin">
          <img
            id="logo"
            src={LogoLeia}
            onClick={() => navigate("/")}
            alt="Logo Leia"
          />
        </div>
        <div className="align-center">
          <Formik
            initialValues={{}}
            onSubmit={handleClickLogin}
            validationSchema={validationSchema}
          >
            <Form className="login-form">
              <Field
                type="text"
                name="email"
                placeholder="Digite seu email"
                className="input form"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />

              <Field
                type="password"
                name="password"
                placeholder="Digite sua senha"
                className="input form"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <button className="login-button" type="submit">
                Login
              </button>

              <div className="txtBtnDivLogin">
                <p
                  className="textButton"
                  id="createAccBtn"
                  onClick={() => navigate("/register-page")}
                >
                  Crie sua conta
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
