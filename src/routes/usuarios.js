var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

router.get("/listarUsername/:username", function (req, res) {
    usuarioController.listarUsername(req, res);
});

router.get("/listarEmail/:email", function (req, res) {
    usuarioController.listarEmail(req, res);
});

router.get("/listarID/:idUsuario", function (req, res) {
    usuarioController.listarID(req, res);
});

router.put("/atualizar/:idUsuario", function (req, res) {
    usuarioController.atualizar(req, res);
});

router.put("/atualizarFoto/:idUsuario", upload.single('foto'),  function (req, res) {
    usuarioController.atualizarFoto(req, res);
});

module.exports = router;