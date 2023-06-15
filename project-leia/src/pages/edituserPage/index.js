import React from "react";
import "./style.css";

const whiteBackgroundStyles = {
  padding: "10px 15px",
};

function EdituserPage() {
  return (
    <div className="edituserPage">
      <div className="fundoBranco">
        <div className="cima">
          <div className="usuario">
            <div className="alignLeft">
              <label class="usuarioLBL">Seu nome de usuario:</label>
            </div>
            <input type="text" className="usuarioInput"></input>
          </div>

          <div className="email">
            <div className="alignLeft">
              <label class="emailLBL">Seu email:</label>
            </div>
            <input type="text" className="emailInput"></input>
          </div>
        </div>
        <div className="FnAlt">
          <label style={whiteBackgroundStyles} className="Alt">
            Alterar sua senha
          </label>
        </div>
        <div className="senhas">
          <div className="senhaAT">
            <div className="alignLeft">
              <label class="senhaATLBL">Confirme sua senha atual:</label>
            </div>
            <input type="text" className="senhaATInput"></input>
          </div>
          <div className="senha">
            <div className="alignLeft">
              <label class="senhaLBL">Digite sua nova senha:</label>
            </div>
            <input type="text" className="senhaInput"></input>
          </div>

          <button className="BTNalteracao" type="submit">
            Confirmar Alterações
          </button>
        </div>
      </div>
    </div>
  );
}
export default EdituserPage;
