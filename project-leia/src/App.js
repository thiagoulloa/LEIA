import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import IntroductionPage from "./pages/introductionPage";
import HomePage from "./pages/homePage";
import RegisterPage from "./pages/registerPage";
import WorkPage from "./pages/workPage";
import EdituserPage from "./pages/edituserPage";
import "./App.css";
import FgtPasswordPage from "./pages/FgtPasswordPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route path="/work-page" element={<WorkPage />} />
        <Route path="/edituserPage" element={<EdituserPage />} />
        <Route path="/FgtPasswordPage" element={<FgtPasswordPage />} />
      </Routes>
    </div>
  );
}

export default App;
