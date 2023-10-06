import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import BlobFunction from "../../MouseMove/MouseMove";
import TopBar from "./components/topBar";
import Footer from "./components/footer";
import IntroductionContent from "./components/content";
import "../../css/PagesDesign/introductionPage.css";
import WebFont from "webfontloader";

function IntroductionPage() {
  let navigate = useNavigate();

  return (
    <div className="IntroductionPage">
      <div className="top-introduction">
        <TopBar />
      </div>
      <IntroductionContent />

      <Footer />
    </div>
  );
}
export default IntroductionPage;
