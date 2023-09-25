import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import WebFont from "webfontloader";
import BlobFunction from "../../MouseMove/MouseMove";
import TopBar from "./components/topBar";
import Footer from "./components/footer";
import "../../css/PagesDesign/introductionPage.css";

function IntroductionPage() {
  let navigate = useNavigate();

  WebFont.load({
    google: {
      families: ["Space Grotesk:500"],
    },
  });

  return (
    <div className="IntroductionPage">
      <div className="top-introduction">
        <TopBar />
      </div>

      <div className="align-bottom">
        <Footer />
      </div>
    </div>
  );
}
export default IntroductionPage;
