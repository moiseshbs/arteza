var express = require("express");
var router = express.Router();

var curtidaController = require("../controllers/curtidaController");

router.get("/listarCurtida/:idUsuario", function (req, res) {
    curtidaController.listarCurtida(req, res);
});

router.post("/curtir/:idPublicacao", function (req, res) {
    curtidaController.curtir(req, res);
});

router.delete("/descurtir/:idPublicacao", function (req, res) {
    curtidaController.descurtir(req, res);
});


module.exports = router;