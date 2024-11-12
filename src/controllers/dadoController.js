var dadoModel = require("../models/dadoModel");

function buscarUltimosDadosGraph(req, res) {
    var idUsuario = req.params.idUsuario;

    dadoModel.buscarUltimosDadosGraph(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarDadosEmTempoRealGraph(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando dados em tempo real`);

    dadoModel.buscarDadosEmTempoRealGraph(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarUltimosDadosKpi(req, res) {
    var idUsuario = req.params.idUsuario;

    dadoModel.buscarUltimosDadosKpi(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarDadosEmTempoRealKpi(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando dados em tempo real`);

    dadoModel.buscarDadosEmTempoRealKpi(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas dados.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    buscarUltimosDadosGraph,
    buscarDadosEmTempoRealGraph,
    buscarUltimosDadosKpi,
    buscarDadosEmTempoRealKpi

}