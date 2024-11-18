var tagModel = require("../models/tagModel");

function listarTop(req, res) {
    tagModel.listarTop().then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas tags.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function recomendacao(req, res) {
    var texto = req.params.tag;

    tagModel.recomendacao(texto).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas tags.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    listarTop,
    recomendacao
}