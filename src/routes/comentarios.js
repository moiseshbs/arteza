var express = require("express");
var router = express.Router();

var comentarioController = require("../controllers/comentarioController");

router.post("/comentar/:idPublicacao", function (req, res) {
    comentarioController.comentar(req, res);
})

router.get("/listarComentario/:idPublicacao", function (req, res) {
    comentarioController.listarComentario(req, res);
});


module.exports = router;