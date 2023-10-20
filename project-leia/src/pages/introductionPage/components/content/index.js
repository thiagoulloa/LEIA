import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../../images/logoleia.png";
import "../../../../css/Components/introPage.css";
import WebFont from "webfontloader";
import logoArquivo from "../../../images/logoarquivo.png";
import DocGif from "../../images/documento.gif";
import Fobjetivo from "../../images/objetivos.png";
import Fsolucao from "../../images/solucao.jpg";

export default function IntroductionContent() {
  let navigate = useNavigate();

  WebFont.load({
    google: {
      families: ["Space Grotesk:500", "Gabarito:400"],
    },
  });

  return (
    <div className="content-introduction">
      <div className="section-1">
        <p className="txt-introduction">
          Otimizando o tempo <p></p>de quem o tempo{" "}
          <span className="color-int"> vale </span> muito
        </p>
      </div>

      <div className="sections-int">
        <div className="txt-content">
          <h1 className="titulos-introduction">Objetivos</h1>
          <p>
            Otimizar a documentação de códigos-fontes no mercado atual. <p />
            Economizar o valioso tempo do programador. <p />
            Facilitar a documentação de projetos no geral. <p />
            Padronizar a documentação como desejado pelo cliente. <p />
          </p>
        </div>
        <div className="container-image">
          <img className="logoarquivo" src={Fobjetivo}></img>
        </div>
      </div>

      <div className="sections-int">
        <div className="container-image">
          <img className="logoarquivo" src={Fsolucao}></img>
        </div>
        <div className="txt-content">
          <h1 className="titulos-introduction">Solução</h1>
          <p>
            inteligência artificial é utilizada para fornecer aos usuários uma
            ferramenta de documentação fácil, rápida e personalizável. <p />{" "}
            Através do nosso site, os usuários podem acessar ferramentas que
            permitem <p /> manipular seus projetos , como equipes e documentos
            de maneira rápida e intuitiva.
          </p>
        </div>
      </div>

      <div className="sections-int">
        <div className="txt-content">
          <h1 className="titulos-introduction">Como Usar?</h1>
          <p>
            Utilizamos duas caixas de texto: uma destinada à entrada de dados
            fornecidos <p />
            pelo usuário e a outra para exibir a resposta de nossa inteligência
            artificial <p />
            já devidamente documentada. Além disso, oferecemos um painel de
            personalização <p />
            para ajustar o estilo da documentação, proporcionando uma
            experiência aprimorada ao usuário.
          </p>
        </div>
        <div className="container-gif">
          <img className="videogif" src={DocGif}></img>
        </div>
      </div>
    </div>
  );
}
