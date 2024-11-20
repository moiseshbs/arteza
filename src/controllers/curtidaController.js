var curtidaModel = require("../models/curtidaModel");

function listarCurtida(req, res) {
    var idUsuario = req.params.idUsuario

    curtidaModel.listarCurtida(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar os avisos: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function curtir(req, res) {
    var idPublicacao = req.body.idPublicacaoServer;
    var idUsuario = req.body.idUsuarioServer;

    curtidaModel.curtir(idPublicacao, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao curtir o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
                console.log(idUsuario)
            }
        );
}

function descurtir(req, res) {
    var idPublicacao = req.body.idPublicacaoServer;
    var idUsuario = req.body.idUsuarioServer;

    curtidaModel.descurtir(idPublicacao, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao descurtir o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarCurtida,
    curtir,
    descurtir
}