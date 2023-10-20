import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../../images/logoleia.png";
import * as yup from "yup";
import Axios from "axios";
import BlobFunction from "../../MouseMove/MouseMove";

function RegisterPage() {
  let navigate = useNavigate();
  const handleClickRegister = (values) => {
    Axios.post("http://projetoleia.ddns.net:3001/register", {
      username: values.username,
      email: values.email,
      password: values.password,
    }).then((response) => {
      console.log(response);
      if (response.status === 200) {
        navigate("/login-page");
      }
    });
  };

  const validationRegister = yup.object().shape({
    username: yup
      .string()
      .min(5, "O username deve ter pelo menos 5 caracteres")
      .required("Este campo é obrigatório"),
    email: yup
      .string()
      .email("Não é um email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter pelo menos 8 caracteres")
      .required("Este campo é obrigatório"),
    confirmedpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "os campos não são iguais"),
  });

  React.useEffect(() => {
    BlobFunction();
  }, []);

  return (
    <div className="registerPage">
      <div className="containerForm">
        <div className="logoDivContainer">
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
            onSubmit={handleClickRegister}
            validationSchema={validationRegister}
          >
            <Form className="register-form">
              <Field
                type="text"
                name="username"
                placeholder="Crie um username"
                className="input form"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="error-message"
              />

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
                placeholder="Crie uma senha"
                className="input form"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <Field
                type="password"
                name="confirmedpassword"
                placeholder="Confirme sua senha"
                className="input form"
              />
              <ErrorMessage
                name="confirmedpassword"
                component="div"
                className="error-message"
              />

              <button className="register-button" type="submit">
                <span>Cadastre-se</span>
              </button>
              <div className="txtBtnDivRegister">
                <p
                  className="textButton"
                  id="createAccBtn"
                  onClick={() => navigate("/login-page")}
                >
                  Já possui uma conta?
                </p>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
      <div id="blob"></div>
      <div id="blur"></div>
    </div>
  );
}

export default RegisterPage;
