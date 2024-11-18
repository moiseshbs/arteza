var express = require("express");
var router = express.Router();

var tagController = require("../controllers/tagController");

router.get("/listarTop/", function (req, res) {
    tagController.listarTop(req, res);
});

router.get("/recomendacao/:tag", function (req, res) {
    tagController.recomendacao(req, res);
});

module.exports = router;