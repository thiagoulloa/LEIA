import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
      </Routes>
    </div>
  );
}

export default App;
