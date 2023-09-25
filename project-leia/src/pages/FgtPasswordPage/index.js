import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import "./style.css";
import LogoLeia from "../../images/logoleia.png";
import * as yup from "yup";
import Axios from "axios";
import BlobFunction from "../../MouseMove/MouseMove";

const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_DURATION = 10 * 60 * 100;

function FgtPasswordPage() {
  let navigate = useNavigate();
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLockedOut, setIsLockedOut] = useState(false);

  const handleClickLogin = (values) => {
    if (isLockedOut) {
      alert("Sua conta está bloqueada. Por favor, tente novamente mais tarde.");
      return;
    }

    Axios.post("http://projetoleia.ddns.net:3001/Login", {
      email: values.email,
      password: values.password,
    })
      .then((response) => {
        if (response.status === 200) {
          navigate("/home-page", { state: response.data.userId });
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          handleFailedLogin();
        }
      });
  };

  const handleFailedLogin = () => {
    setLoginAttempts((prevAttempts) => prevAttempts + 1);

    if (loginAttempts + 1 === MAX_LOGIN_ATTEMPTS) {
      setIsLockedOut(true);
      setTimeout(() => {
        setIsLockedOut(false);
        setLoginAttempts(0);
      }, LOCKOUT_DURATION);
    }
  };

  React.useEffect(() => {
    BlobFunction();
  }, []);

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
            onSubmit={handleClickLogin}
            validationSchema={validationSchema}
          >
            <Form className="login-form">
              <Field
                type="password"
                name="password"
                placeholder="Insira sua nova senha"
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
                placeholder="Confirme a senha"
                className="input form"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />

              <button className="login-buttonFGT" type="submit">
                <span>Confirmar</span>
              </button>

              <div className="txtBtnDivLogin">
                <p
                  className="textButton"
                  id="createAccBtn"
                  onClick={() => navigate("/register-page")}
                >
                  Login
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

export default FgtPasswordPage;
