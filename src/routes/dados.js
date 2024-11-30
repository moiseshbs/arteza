var express = require("express");
var router = express.Router();

var dadoController = require("../controllers/dadoController");

router.get("/ultimas/:idUsuario", function (req, res) {
    dadoController.buscarUltimosDadosGraph(req, res);
});

router.get("/listarCurtida/:idUsuario", function (req, res) {
    dadoController.listarCurtida(req, res);
});

router.get("/listarComentario/:idUsuario", function (req, res) {
    dadoController.listarComentario(req, res);
});

router.get("/listarVisualizacao/:idUsuario", function (req, res) {
    dadoController.listarVisualizacao(req, res);
});

router.get("/listarKpi/:idUsuario", function(req, res) {
    dadoController.listarKpi(req, res);
});

module.exports = router;