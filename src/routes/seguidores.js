var express = require("express");
var router = express.Router();

var seguidorController = require("../controllers/seguidorController");

router.get("/listarSeguindo/:idUsuario", function (req, res) {
    seguidorController.listarSeguindo(req, res);
});

router.get("/listarSeguidores/:idUsuario", function (req, res) {
    seguidorController.listarSeguidores(req, res);
});

router.post("/seguir/:idUsuario", function (req, res) {
    seguidorController.seguir(req, res);
});

router.delete("/desseguir/:idUsuario", function (req, res) {
    seguidorController.desseguir(req, res);
});

module.exports = router;