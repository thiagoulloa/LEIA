import React from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  let navigate = useNavigate();

  return (
    <div className="Home">
      <h1>Login Page</h1>
      <button onClick={() => navigate("/home-page")}>Home Page</button>
    </div>
  );
}

export default LoginPage;
