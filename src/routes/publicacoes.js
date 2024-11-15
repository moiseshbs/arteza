var express = require("express");
var router = express.Router();
const upload = require('../config/configUpload'); // ARQUIVO COM A CONFIGURAÇÃO DO UPLOAD

var publicacaoController = require("../controllers/publicacoesController");

router.get("/listar", function (req, res) {
    publicacaoController.listar(req, res);
});

router.get("/listar/:idUsuario", function (req, res) {
    publicacaoController.listarPorUsuario(req, res);
});

router.get("/listarID/:idPublicacao", function (req, res) {
    publicacaoController.listarPorId(req, res);
});

router.get("/listarCurtida/:idUsuario", function (req, res) {
    publicacaoController.listarCurtida(req, res);
});


router.get("/pesquisar/:descricao", function (req, res) {
    publicacaoController.pesquisarDescricao(req, res);
});

// router.post("/publicar/:idUsuario", function (req, res) {
//     publicacaoController.publicar(req, res);
// });

router.post("/publicar/:idUsuario", upload.single('foto'), (req, res) => {
    publicacaoController.publicar(req, res);
});

router.put("/editar/:idPublicacao", function (req, res) {
    publicacaoController.editar(req, res);
});

router.delete("/deletar/:idPublicacao", function (req, res) {
    publicacaoController.deletar(req, res);
});

// rotas para curtida
router.post("/curtir/:idPublicacao", function (req, res) {
    publicacaoController.curtir(req, res);
});

router.delete("/descurtir/:idPublicacao", function (req, res) {
    publicacaoController.descurtir(req, res);
});

//rotas de comentario
router.post("/comentar/:idPublicacao", function (req, res) {
    publicacaoController.comentar(req, res);
})

router.get("/listarComentario/:idPublicacao", function (req, res) {
    publicacaoController.listarComentario(req, res);
});

//rota de visualizacao
router.post("/visualizar/:idPublicacao", function (req, res) {
    publicacaoController.visualizar(req, res);
});

router.get("/listarTop", function (req, res) {
    publicacaoController.listarTop(req, res);
});

module.exports = router;