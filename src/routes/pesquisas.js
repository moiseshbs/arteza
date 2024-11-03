var express = require("express");
var router = express.Router();

var pesquisasController = require("../controllers/pesquisasController");

router.get("/pesquisar/:texto", function (req, res) {
    pesquisasController.pesquisar(req, res);
});

module.exports = router;