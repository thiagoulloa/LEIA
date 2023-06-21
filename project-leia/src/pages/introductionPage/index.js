import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import WebFont from "webfontloader";
import BlobFunction from "../../MouseMove/MouseMove";
import TopBar from "./components/topBar";
import Footer from "./components/footer";

function IntroductionPage() {
  let navigate = useNavigate();

  React.useEffect(() => {
    BlobFunction();
  }, []);

  WebFont.load({
    google: {
      families: ["Space Grotesk:500"],
    },
  });

  return (
    <div className="IntroductionPage">
      <div className="align-top">
        <TopBar />
      </div>
      <div className="align-center">
        <div className="QuadradoBranco">
          <div style={{ fontFamily: "Space Grotesk" }}>
            <p className="IntroductionTexto">
              {" "}
              Seja bem vindo ao Projeto Léia! <br></br>
              Aqui você encontrará uma solução rápida e prática para sua
              documentação de códigos, com nossa inteligência artificial eleve a
              qualidade de seus projetos e economize seu tempo!{" "}
            </p>
          </div>
        </div>
        <div id="blob"></div>
        <div id="blur-introduction-page"></div>
      </div>
      <div className="align-bottom">
        <Footer />
      </div>
    </div>
  );
}
export default IntroductionPage;
