var database = require("../database/config");

function listarTop() {

    var instrucaoSql = `
        SELECT
            t.idTag,
            t.nome, 
            MAX(p.imgPublicacao) AS imgPublicacao
        FROM tag AS t
            LEFT JOIN tag_publicacao AS tp
                ON tp.fkTag = t.idTag
            LEFT JOIN publicacao AS p
                ON tp.fkPublicacao = p.idPublicacao
        GROUP BY
            t.idTag,
            t.nome
        ORDER BY
            imgPublicacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recomendacao(texto) {

    var instrucaoSql = `
        SELECT 
            t.idTag,
            t.nome
            FROM tag AS t
            WHERE t.nome LIKE '%${texto}%';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarTop,
    recomendacao
}
