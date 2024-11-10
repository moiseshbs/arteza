var database = require("../database/config");

function buscarUltimosDados(idUsuario, limite_linhas) {

    var instrucaoSql = `
        SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = ${idUsuario}) AS publicacao,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS comentario,
            
            (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS curtida,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS visualizacao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEmTempoReal(idUsuario) {
    var instrucaoSql = `
        SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = ${idUsuario}) AS publicacao,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS comentario,
            
            (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS curtida,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS visualizacao;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimosDados,
    buscarDadosEmTempoReal
}
