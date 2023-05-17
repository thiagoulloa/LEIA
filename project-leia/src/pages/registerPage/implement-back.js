//"importando informações de codigos externos do node"
const mysql = require('mysql');
const connection = require('./app');


// puxando e tranformando em variavel o dados do usuario da aba html
const username = document.getElementById("username").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const formData = { nome, email,senha };

//mandando estes mesmo dados para a conexão que esta em outro arquivo
connection.query(
'INSERT INTO registro (username,email,password) VALUES (?,?,?)',
[username, email, senha],
(error,results,fields)=>{
if(error) throw error;
console.log('Usuario adicionado com sucesso');
}
)