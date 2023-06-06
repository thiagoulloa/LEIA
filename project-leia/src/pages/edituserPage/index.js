import React from "react";
import "./style.css";

const whiteBackgroundStyles = {
  backgroundColor: "white",
  padding: "10px 15px",
};

function EdituserPage() {
  return (
    <div className="edituserPage">
      <div className="fundoBranco">
        <div className="email">
          <div className="alignLeft">
            <label class="emailLBL">Seu email:</label>
          </div>
          <input type="text" className="emailInput"></input>
        </div>

        <div className="FnAlt">
          <label style={whiteBackgroundStyles} className="Alt">
            Alterar sua senha
          </label>
        </div>
        <div className="senhas">
          <div className="senhaAT">
            <div className="alignLeft">
              <label class="senhaATLBL">Digite sua senha atual:</label>
            </div>
            <input type="text" className="senhaATInput"></input>
          </div>
          <div className="senha">
            <div className="alignLeft">
              <label class="senhaLBL">Altere sua senha:</label>
            </div>
            <input type="text" className="senhaInput"></input>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EdituserPage;
