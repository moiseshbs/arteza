var express = require("express");
var router = express.Router();

var dadoController = require("../controllers/dadoController");

router.get("/ultimas/:idUsuario", function (req, res) {
    dadoController.buscarUltimosDadosGraph(req, res);
});

router.get("/tempo-real/:idUsuario", function (req, res) {
    dadoController.buscarDadosEmTempoRealGraph(req, res);
})

router.get("/ultimas/:idUsuario", function (req, res) {
    dadoController.buscarUltimosDadosKpi(req, res);
});

router.get("/tempo-real/:idUsuario", function (req, res) {
    dadoController.buscarDadosEmTempoRealKpi(req, res);
})

module.exports = router;