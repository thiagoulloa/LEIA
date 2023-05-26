import React from "react";
import { useNavigate } from "react-router-dom";
import LogoLeia from "../../images/logoleia.png";
import "./style.css";
import WebFont from 'webfontloader';

import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

function IntroductionPage() {
  let navigate = useNavigate();


  
    WebFont.load({
      google: {
        families: ['Noto Sans:400']
      }
    });
   
   
  return (

    <div className="IntroductionPage">
     
     
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
        <div className="QuadradoBranco">


          <div style={{fontFamily: 'Noto Sans'}}>
<p className ="IntroductionTexto"> Seja bem vindo ao Projeto Léia? <br></br>
Aqui você encontrará uma solução rápida e prática para sua documentação de códigos, com nossa inteligência artificial eleve a qualidade de seus projetos e economize seu tempo! </p>

          </div>
      </div>
      
      
    </div>

<div className="footer">
    <MDBFooter className='text-center text-white' style={{ backgroundColor: '#f1f1f1' }}>
      <MDBContainer className='pt-4'>
        <section className='mb-4'>
          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fab fa-facebook-f' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-twitter' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-google' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-instagram' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-linkedin' />
          </MDBBtn>

          <MDBBtn
            rippleColor="dark"
            color='link'
            floating
            size="lg"
            className='text-dark m-1'
            href='#!'
            role='button'
          >
            <MDBIcon fab className='fa-github' />
          </MDBBtn>
        </section>
      </MDBContainer>

      <div className='text-center text-dark p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2020 Copyright:
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
    </div>





    </div>
    
    
  );
}
export default IntroductionPage;
