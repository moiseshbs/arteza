var express = require("express");
var router = express.Router();

var dadoController = require("../controllers/dadoController");

router.get("/ultimas/:idUsuario", function (req, res) {
    dadoController.buscarUltimosDados(req, res);
});

router.get("/tempo-real/:idUsuario", function (req, res) {
    dadoController.buscarDadosEmTempoReal(req, res);
})

module.exports = router;