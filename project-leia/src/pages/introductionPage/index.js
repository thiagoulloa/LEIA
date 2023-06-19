import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../images/logoleia.png";
import Instagram from "./images/Instagram.png";
import linkedin from "./images/linkedin.png";
import "./style.css";
import WebFont from 'webfontloader';
import BlobFunction from "../../MouseMove/MouseMove";

function IntroductionPage() {
  let navigate = useNavigate();

  React.useEffect(() => {
    BlobFunction();
  }, []);
  
    WebFont.load({
      google: {
        families: ['Space Grotesk:500']
      }
    });
   
   
  return (

    <div className="IntroductionPage">
     
     <div className="align-top">

     
     
      <div className="topBar">
        <div className="alignLeft">
        
          <img className="logo homebar" src={LogoLeia}></img>
          
        </div>
        


        <div className="alignRight">
          <p id="loginBtn" onClick={() => navigate("/login-page")}>
            Sign In
          </p>

          <button id="registerBtn" onClick={() => navigate("/register-page")}>
            Sign Up
          </button>

          
          </div>
        </div>
    </div>

        <div className="align-center">
          <div className="QuadradoBranco">


          <div style={{fontFamily: 'Space Grotesk'}}>
<p className ="IntroductionTexto"> Seja bem vindo ao Projeto Léia! <br></br>
Aqui você encontrará uma solução rápida e prática para sua documentação de códigos, com nossa inteligência artificial eleve a qualidade de seus projetos e economize seu tempo! </p>

          </div>
        </div>
      </div>

      
      
   <div className="align-bottom">

<div className="footer">
    
<div className="cardF">

<div className="alignLeft"></div>

  <div className="alignCenter">
<div style={{fontFamily: 'Space Grotesk'}}>
  <p className="TextoFT">© 2023 Todos os direitos reservados, Projeto Léia®</p>
  </div>
  </div>
  <div className="alignRight">
  <a href="https://heylink.me/projetoleia/">
  <img className="logo linkedin" src={linkedin}></img>
  </a>
  <img className="logo instagram" src={Instagram}></img>
  </div>
</div>


        </div>

      </div>' '
      <div id="blob"></div>
      <div id="blur"></div>
    </div>
    
    
  );
}
export default IntroductionPage;
