const express  = require('express');
const { exibirContas, criarConta, atualizarConta, excluirConta } = require('./controladores/usuarioController')
const { sacar, depositar, transferir, saldo, extrato } = require('./controladores/bancoController')
const verificarSenha = require('./intermediarios');

const rotas = express();



rotas.post("/contas", criarConta);
rotas.get("/contas", verificarSenha, exibirContas);
rotas.put("/contas/:numero", atualizarConta);
rotas.delete("/contas/:numero", excluirConta);

rotas.post("/depositar", depositar);
rotas.post("/sacar", sacar);
rotas.post("/transferir", transferir);
rotas.get("/saldo", saldo);
rotas.get("/extrato", extrato);

module.exports = rotas;