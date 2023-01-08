const bancodedados = require('./bancodedados');

const verificarSenha = (req, res, next) => {
    let { senha_banco } = req.query;

    if (senha_banco != bancodedados.banco.senha) {
        return res.status(401).json({mensagem: "Senha incorreta !"})
    }
    next();
}

module.exports = verificarSenha;