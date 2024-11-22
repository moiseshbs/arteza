var seguidorModel = require("../models/seguidorModel");

function listarSeguindo(req, res) {
    var idUsuario = req.params.idUsuario

    seguidorModel.listarSeguindo(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar seguidores: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function listarSeguidores(req, res) {
    var idUsuario = req.params.idUsuario

    seguidorModel.listarSeguidores(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar seguidores: ", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function seguir(req, res) {
    var idUsuario = req.params.idUsuario;
    var idSeguido = req.body.idSeguidoServer;

    seguidorModel.seguir(idUsuario, idSeguido)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao seguir usuario: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function desseguir(req, res) {
    var idUsuario = req.params.idUsuario;
    var idSeguido = req.body.idSeguidoServer;

    seguidorModel.desseguir(idUsuario, idSeguido)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao desseguir usuario: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    listarSeguindo,
    listarSeguidores,
    seguir,
    desseguir
}