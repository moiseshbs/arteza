var database = require("../database/config");

function listarTop() {

    var instrucaoSql = `
        SELECT t.nome, p.imgPublicacao FROM tag AS t
        JOIN tag_publicacao AS tp
            ON tp.fkTag = t.idTag
        JOIN publicacao AS p
            ON tp.fkPublicacao = p.idPublicacao;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTop
}
