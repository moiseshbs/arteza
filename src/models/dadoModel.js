var database = require("../database/config");

function listarComentario(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COUNT(idComentario) AS comentario,
            MONTHNAME(dtComentario) AS dtComentario
            FROM comentario AS c
            JOIN publicacao AS p
                ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}
            GROUP BY 
                MONTHNAME(dtComentario)
            ORDER BY MONTHNAME(dtComentario);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCurtida(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COUNT(idCurtida) AS curtida,
            MONTHNAME(dtCurtida) AS dtCurtida
            FROM curtida AS l
            JOIN publicacao AS p
                ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}
            GROUP BY 
                MONTHNAME(dtCurtida)
            ORDER BY MONTHNAME(dtCurtida);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarVisualizacao(idUsuario) {
    var instrucaoSql = `
        SELECT 
            COUNT(idVisualizacao) AS visualizacao,
            MONTHNAME(dtVisualizacao) AS dtVisualizacao
            FROM visualizacao AS v
            JOIN publicacao AS p
                ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}
            GROUP BY 
                MONTHNAME(dtVisualizacao)
            ORDER BY MONTHNAME(dtVisualizacao);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarKpi(idUsuario) {
    var instrucaoSql = `
        SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = ${idUsuario}) AS publicacaoKpi,
            
			(SELECT COUNT(l.idCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS curtidaKpi,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS comentarioKpi,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS visualizacaoKpi,
            
            (SELECT COUNT(s.fkSeguidor) 
            FROM seguidor AS s
            JOIN usuario AS u ON s.fkSeguido = u.idUsuario
            WHERE u.idUsuario = ${idUsuario}) AS seguidorKpi;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listarCurtida,
    listarComentario,
    listarVisualizacao,
    listarKpi,
}
