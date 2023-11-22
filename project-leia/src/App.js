import * as React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import IntroductionPage from "./pages/introductionPage";
import ProjectPage from "./pages/projectPage";
import RegisterPage from "./pages/registerPage";
import WorkPage from "./pages/workPage";
import EdituserPage from "./pages/edituserPage";
import "./App.css";
import FgtPasswordPage from "./pages/FgtPasswordPage";
import ProjConfigPage from "./pages/projConfigPage";
import NewProjPage from "./pages/newProjPage";
import TeamsPage from "./pages/TeamsPage";
import TeamPage from "./pages/TeamPage";
import HomePage from "./pages/homePage";
import FolderPage from "./pages/FolderPage";
import { ToastContainer, toast } from "react-toastify";

function App() {
  function notifySuccess(msg) {
    toast.success(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function notifyError(msg) {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  function notifyWarning(msg) {
    toast.warn(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IntroductionPage />} />
        <Route
          path="/project-page"
          element={<ProjectPage notifySuccess={notifySuccess} />}
        />
        <Route
          path="/login-page"
          element={<LoginPage notifySuccess={notifySuccess} />}
        />
        <Route path="/register-page" element={<RegisterPage />} />
        <Route
          path="/work-page"
          element={
            <WorkPage notifySuccess={notifySuccess} notifyError={notifyError} />
          }
        />
        <Route
          path="/edituserPage"
          element={<EdituserPage notifySuccess={notifySuccess} />}
        />
        <Route path="/FgtPasswordPage" element={<FgtPasswordPage />} />
        <Route
          path="/projConfig"
          element={<ProjConfigPage notifySuccess={notifySuccess} />}
        />
        <Route
          path="/new-project"
          element={<NewProjPage notifySuccess={notifySuccess} />}
        />
        <Route
          path="/teams-page"
          element={<TeamsPage notifySuccess={notifySuccess} />}
        />
        <Route
          path="/team-page"
          element={
            <TeamPage
              notifySuccess={notifySuccess}
              notifyError={notifyError}
              notifyWarning={notifyWarning}
            />
          }
        />
        <Route
          path="/home-page"
          element={<HomePage notifySuccess={notifySuccess} />}
        />
        <Route
          path="/folder-page"
          element={
            <FolderPage
              notifyError={notifyError}
              notifySuccess={notifySuccess}
              notifyWarning={notifyWarning}
            />
          }
        />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
