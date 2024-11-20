var comentarioModel = require("../models/comentarioModel");

function comentar(req, res) {
    var idPublicacao = req.params.idPublicacao;
    var idUsuario = req.body.idUsuarioServer;
    var comentario = req.body.comentarioServer;

    if (comentario == undefined) {
        res.status(400).send("O comentario está indefinido!");
    } else if (idUsuario == undefined) {
        res.status(403).send("O id do usuário está indefinido!");
    } else {
        comentarioModel.comentar(idPublicacao, idUsuario, comentario)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("Houve um erro ao realizar o comentario: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarComentario(req, res) {
    var idPublicacao = req.params.idPublicacao;

    comentarioModel.listarComentario(idPublicacao)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os avisos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    comentar,
    listarComentario
}