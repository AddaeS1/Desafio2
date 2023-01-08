//const contas = require("../bancodedados");
let { contas } = require("../bancodedados");
let idConta = 1;

const exibirContas = (req, res) => {
    return res.status(200).json(contas);
}


const criarConta = (req,res) => {
     
        try{
        let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

        if(!nome){
            return res.status(412).json({mensagem: "O campo NOME tem preenchimento obrigatório, favor informar !"})
        }

        if(!cpf){
            return res.status(412).json({mensagem: "O campo CPF tem preenchimento obrigatório, favor informar !"})
        }

        if(!data_nascimento){
            return res.status(412).json({mensagem: "O campo DATA DE NASCIMENTO tem preenchimento obrigatório, favor informar !"})
        }

        if(!telefone){
            return res.status(412).json({mensagem: "O campo TELEFONE tem preenchimento obrigatório, favor informar !"})
        }

        if(!email){
            return res.status(412).json({mensagem: "O campo EMAIL tem preenchimento obrigatório, favor informar !"})
        }
        
        if(!senha){
            return res.status(412).json({mensagem: "O campo SENHA tem preenchimento obrigatório, favor informar !"})
        }

        const verificarNumCpf = contas.find((usuario) => {
            return usuario.cpf === cpf;
        });

        if(verificarNumCpf) {
            return res.status(409).json({ mesagem: "O CPF informado já se encontra cadastrado, favor informar valor diferente !"});
        }

        const verificarEmail = contas.find((usuario) => {
            return usuario.email === email;
        });

        if(verificarEmail) {
            return res.status(409).json({ mesagem: "O E-MAIL informado já se encontra cadastrado, favor informar valor diferente !"});
        }
        
        const usuario = { nome, cpf, data_nascimento, telefone, email, senha };

        const contaBancaria = {
            numero: idConta, 
            saldo: 0, 
            ...usuario
        }

        contas.push(contaBancaria)
        idConta++;
        return res.status(201).send();
    }catch(error) {
        return res.status(400).json({error});
        }
    
    }

const atualizarConta = (req,res) => {
 
    let { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const { numero } = req.params;


    try { 
    let contaExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );
    let { usuario } = contaExistente;
    
    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
        }
    
    if(!nome){
        return res.status(412).json({mensagem: "O campo NOME tem preenchimento obrigatório, favor informar !"})
    }

    if(!cpf){
        return res.status(412).json({mensagem: "O campo CPF tem preenchimento obrigatório, favor informar !"})
    }

    if(!data_nascimento){
        return res.status(412).json({mensagem: "O campo DATA DE NASCIMENTO tem preenchimento obrigatório, favor informar !"})
    }

    if(!telefone){
        return res.status(412).json({mensagem: "O campo TELEFONE tem preenchimento obrigatório, favor informar !"})
    }

    if(!email){
        return res.status(412).json({mensagem: "O campo EMAIL tem preenchimento obrigatório, favor informar !"})
    }
    
    if(!senha){
        return res.status(412).json({mensagem: "O campo SENHA tem preenchimento obrigatório, favor informar !"})
    }

    if(cpf) {
        const verificarNumCpf = contas.find(({usuario}) => {
            return usuario.cpf === cpf;
        });

        if(verificarNumCpf){
            return res.status(409).json({ mesagem: "O CPF informado já se encontra cadastrado, favor informar valor diferente !"});
        }

    }

    if(email) {
        const verificarEmail = contas.find(({usuario}) => {
            return usuario.email === email;
        });

        if(verificarEmail){
            return res.status(409).json({ mesagem: "O E-MAIL informado já se encontra cadastrado, favor informar valor diferente !"});
        }

    }

    usuario.nome = nome;
    usuario.data_nascimento = data_nascimento;
    usuario.telefone = telefone;
    usuario.senha = senha;
    if(cpf) { usuario.cpf = cpf};
    if(email) { usuario.email = email};

    return res.status(201)

} catch(error) {
    return res.status(400).json({error});
    }
}

const excluirConta = (req,res) => {
    let numeroConta  = req.params.numero;
    
    if(isNaN(numeroConta)) {
        return res.status(400).json({mensagem: "Número da conta não informado, favor repetir a operação informando o número de conta  !"})
    }    

    let contaExistente = contas.find(conta => { return Number(conta.numero) === Number(numeroConta) } );
    
    if(!contaExistente){
        return res.status(404).json({mensagem: "A conta informada não existe !"})
    }

    if(contaExistente.saldo !== 0) {
        return res.status(405).json({mensagem: "Conta com saldo disponível, favor igualar o saldo a zero(0) para exclusão !"})
    }
 
    filtroContas = contas.filter((conta) => {
        return Number(conta.numero) !== Number(numeroConta)
    });

    return res.status(204).json();
    
}



module.exports = {
    exibirContas,
    criarConta,
    atualizarConta,
    excluirConta
};