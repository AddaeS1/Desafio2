//import {format} from 'date-fns'
const { format } = require("date-fns") ;
const bancodedados = require("../bancodedados");
//const { contas } = require("../bancodedados");

const depositar = (req, res) => {
    let { numero, valor } = req.body;
    let { contas } = bancodedados;

    if(!numero){
        return res.send(404).json({mensagem: "Favor informar conta para depósito !"})
    }

    if(!valor){
        return res.send(404).json({mensagem: "Favor informar valor para depósito !"})
    }

    if(!Number(valor) || Number(valor) <= 0  ) {
        return res.status(401).json({mensagem: "Somete a utilização de números é permitida ! Valor deve ser maior que zero(0) !"})
    }

    let contaExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );

    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    Number(contaExistente.saldo) + Number(valor);

    let registroDeposito = {
        data: format(new Date(), "yyyy--MM--dd hh:mm:ss"),
        numero,
        valor,
    }

    bancodedados.depositos.push(registroDeposito);

    return res.status(200).json({mensagem: `Depósito realizado na conta de número${numero}, no valor de R$${valor}.`})
    
}


const sacar = (req, res) => {
    let { numero, senha_usuario, valor } = req.body;
    let { contas } = bancodedados;

    if(!numero){
        return res.send(404).json({mensagem: "Favor informar conta para saque !"})
    }

    if(!senha){
        return res.send(404).json({mensagem: "Senha incorreta ! Tente novamente !"})
    }

    if(!valor){
        return res.send(404).json({mensagem: "Favor informar valor para saque !"})
    }

    if(!Number(valor) || Number(valor) <= 0  ) {
        return res.status(401).json({mensagem: "Somete a utilização de números é permitida ! Valor deve ser maior que zero(0) !"})
    }

    let contaExistente = contas.find(conta => conta.numero === numero);

    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    //const { usuario, saldo } = contaExistente;

    if(senha_usuario != contaExistente.senha){
        return res.status(401).json({mensagem: "A senha informada está incorreta !"})
    }

    if(saldo < valor) {
        return res.status(401).json({mensagem: "Seu saldo é insuficiente para a relização desta operação !"})
    }

    parseInt(contaExistente.saldo)  - parseInt(valor);

    

    let registroSaque = {
        data: format(new Date(), "yyyy--MM--dd hh:mm:ss"),
        numero,
        valor,
    }

    bancodedados.saques.push(registroSaque);

    return res.status(200).json({mensagem: `Saque realizado da conta de número${numero}, noa valor de R$${valor}.`})
    
}

const transferir = (req,res) => {
    let { contaOrigem, senha_usuario, contaDestino, valor } = req.body;
    let { contas } = bancodedados;

    if(!contaOrigem){
        return res.send(404).json({mensagem: "Favor informar conta para origem para transferência !"})
    }

    if(!contaDestino){
        return res.send(404).json({mensagem: "Favor informar conta destino para transferência !"})
    }

    if(!senha){
        return res.send(404).json({mensagem: "Senha incorreta ! Tente novamente !"})
    }

    if(!valor){
        return res.send(404).json({mensagem: "Favor informar valor para transferência !"})
    }

    let contaOrigemExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );

    if(!contaOrigemExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    if(contaOrigemExistente.senha != senha_usuario){
        return res.status(401).json({mensagem: "A senha informada está incorreta !"})
    }
    let contaDestinoExistente = contas.find(conta => conta.numero === contaDestino);

    if(!contaDestinoExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    if(Number(valor) < Number(contaOrigem.saldo)){
        return res.status(401).json({mensagem: "Saldo insuficiente !"})
    }

    parseInt(contaOrigem.saldo) - parseInt(valor);
    parseInt(contaDestino.saldo) + parseInt(valor);

    let registroTransferencia = {
        data: format(new Date(), "yyyy--MM--dd hh:mm:ss"),
        conta_de_origem: contaOrigem,
        conta_de_destino: contaDestino,
        valor,
    }

    bancodedados.tranferencias.push(registroTransferencia);

    return res.status(200).json({mensagem: `Transferência realizada da conta de número${contaOrigem}, para a conta de número${contaDestino}, no valor de R$${valor}. `})

}

const saldo = (req,res) => {
    let { numero, senha_usuario } = req.query;
    let { contas } = bancodedados;

    if(!numero){
        return res.send(404).json({mensagem: "Favor informar conta para prosseguir !"})
    }

    if(!senha_usuario){
    return res.send(404).json({mensagem: "Favor informar para prosseguir !"})}

    let contaExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );

    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    if(senha_usuario != usuario.senha){
        return res.status(401).json({mensagem: "A senha informada está incorreta !"})
    }

    return res.status(201).json({ mensagem: `O saldo disponível é de : ${contaExistente.saldo}`})

}

const extrato = (req,res) => {
    let { numero, senha_usuario } = req.query;
    let { contas } = bancodedados;

    if(!numero){
        return res.send(404).json({mensagem: "Favor informar conta para prosseguir !"})
    }

    if(!senha_usuario){
    return res.send(404).json({mensagem: "Favor informar para prosseguir !"})}

    let contaExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );

    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    if(senha_usuario != usuario.senha){
        return res.status(401).json({mensagem: "A senha informada está incorreta !"})
    }

    let depositos = bancodedados.depositos.filter((deposito) => {
        return depositos.numero_conta === numero;
    })

    let saques = bancodedados.saques.filter((saque) => {
        return saques.numero_conta === numero;
    })

    let transferenciasOriginarias = bancodedados.tranferencias.filter((transferencia) => {
        return transferencia.conta_de_origem === numero;
    })

    let transferenciasDestinatarias = bancodedados.transferencias.filter((transferencia) => {
        return transferencia.conta_de_destino === numero;
    })
    
    let extrato = {
        depositos,
        saques,
        transferenciasOriginarias,
        transferenciasDestinatarias
    }

    return res.send(200).json(extrato)

}

module.exports = {
    depositar,
    sacar,
    transferir,
    saldo,
    extrato
}