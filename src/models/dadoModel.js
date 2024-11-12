var database = require("../database/config");

function buscarUltimosDadosGraph(idUsuario) {

    var instrucaoSql = `
            SELECT 
        DATE_FORMAT(base.mes_referencia, '%M') AS mes,
        IFNULL(publicacoes.total_publicacao, 0) AS publicacao,
        IFNULL(comentarios.total_comentario, 0) AS comentario,
        IFNULL(curtidas.total_curtida, 0) AS curtida,
        IFNULL(visualizacoes.total_visualizacao, 0) AS visualizacao,
        kpis.publicacaoKpi,
        kpis.comentarioKpi,
        kpis.curtidaKpi,
        kpis.visualizacaoKpi
    FROM (
        SELECT DISTINCT DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia
        FROM publicacao
        UNION
        SELECT DISTINCT DATE_FORMAT(dtComentario, '%Y-%m-01')
        FROM comentario
        UNION
        SELECT DISTINCT DATE_FORMAT(dtCurtida, '%Y-%m-01')
        FROM curtida
        UNION
        SELECT DISTINCT DATE_FORMAT(dtVisualizacao, '%Y-%m-01')
        FROM visualizacao
    ) AS base

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_publicacao
        FROM publicacao
        WHERE fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS publicacoes
    ON base.mes_referencia = publicacoes.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtComentario, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_comentario
        FROM comentario
        JOIN publicacao ON comentario.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS comentarios
    ON base.mes_referencia = comentarios.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtCurtida, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_curtida
        FROM curtida
        JOIN publicacao ON curtida.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS curtidas
    ON base.mes_referencia = curtidas.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtVisualizacao, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_visualizacao
        FROM visualizacao
        JOIN publicacao ON visualizacao.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS visualizacoes
    ON base.mes_referencia = visualizacoes.mes_referencia

    CROSS JOIN (
        SELECT 
            (SELECT COUNT(p.idPublicacao)
                FROM publicacao AS p
                WHERE p.fkUsuario = ${idUsuario}) AS publicacaoKpi,
            (SELECT COUNT(c.idComentario)
                FROM comentario AS c
                JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS comentarioKpi,
            (SELECT COUNT(l.qtdCurtida) 
                FROM curtida AS l
                JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS curtidaKpi,
            (SELECT COUNT(v.idVisualizacao) 
                FROM visualizacao AS v
                JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS visualizacaoKpi
    ) AS kpis
     
    ORDER BY base.mes_referencia;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEmTempoRealGraph(idUsuario) {
    var instrucaoSql = `
                SELECT 
        DATE_FORMAT(base.mes_referencia, '%M') AS mes,
        IFNULL(publicacoes.total_publicacao, 0) AS publicacao,
        IFNULL(comentarios.total_comentario, 0) AS comentario,
        IFNULL(curtidas.total_curtida, 0) AS curtida,
        IFNULL(visualizacoes.total_visualizacao, 0) AS visualizacao,
        kpis.publicacaoKpi,
        kpis.comentarioKpi,
        kpis.curtidaKpi,
        kpis.visualizacaoKpi
    FROM (
        SELECT DISTINCT DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia
        FROM publicacao
        UNION
        SELECT DISTINCT DATE_FORMAT(dtComentario, '%Y-%m-01')
        FROM comentario
        UNION
        SELECT DISTINCT DATE_FORMAT(dtCurtida, '%Y-%m-01')
        FROM curtida
        UNION
        SELECT DISTINCT DATE_FORMAT(dtVisualizacao, '%Y-%m-01')
        FROM visualizacao
    ) AS base

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtPublicacao, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_publicacao
        FROM publicacao
        WHERE fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS publicacoes
    ON base.mes_referencia = publicacoes.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtComentario, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_comentario
        FROM comentario
        JOIN publicacao ON comentario.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS comentarios
    ON base.mes_referencia = comentarios.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtCurtida, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_curtida
        FROM curtida
        JOIN publicacao ON curtida.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS curtidas
    ON base.mes_referencia = curtidas.mes_referencia

    LEFT JOIN (
        SELECT 
            DATE_FORMAT(dtVisualizacao, '%Y-%m-01') AS mes_referencia, 
            COUNT(*) AS total_visualizacao
        FROM visualizacao
        JOIN publicacao ON visualizacao.fkPublicacao = publicacao.idPublicacao
        WHERE publicacao.fkUsuario = ${idUsuario}
        GROUP BY mes_referencia
    ) AS visualizacoes
    ON base.mes_referencia = visualizacoes.mes_referencia

    CROSS JOIN (
        SELECT 
            (SELECT COUNT(p.idPublicacao)
                FROM publicacao AS p
                WHERE p.fkUsuario = ${idUsuario}) AS publicacaoKpi,
            (SELECT COUNT(c.idComentario)
                FROM comentario AS c
                JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS comentarioKpi,
            (SELECT COUNT(l.qtdCurtida) 
                FROM curtida AS l
                JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS curtidaKpi,
            (SELECT COUNT(v.idVisualizacao) 
                FROM visualizacao AS v
                JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
                WHERE p.fkUsuario = ${idUsuario}) AS visualizacaoKpi
    ) AS kpis
     
    ORDER BY base.mes_referencia;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarUltimosDadosKpi(idUsuario) {

    var instrucaoSql = `
        SELECT
			(SELECT COUNT(p.idPublicacao)
            FROM publicacao AS p
            WHERE p.fkUsuario = ${idUsuario}) AS publicacaoKpi,
            
            (SELECT COUNT(c.idComentario)
            FROM comentario AS c
            JOIN publicacao AS p ON c.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS comentarioKpi,
            
            (SELECT COUNT(l.qtdCurtida) 
            FROM curtida AS l
            JOIN publicacao AS p ON l.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS curtidaKpi,
            
            (SELECT COUNT(v.idVisualizacao) 
            FROM visualizacao AS v
            JOIN publicacao AS p ON v.fkPublicacao = p.idPublicacao
            WHERE p.fkUsuario = ${idUsuario}) AS visualizacaoKpi;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarDadosEmTempoRealKpi(idUsuario) {
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
    buscarUltimosDadosGraph,
    buscarDadosEmTempoRealGraph,
    buscarUltimosDadosKpi,
    buscarDadosEmTempoRealKpi,
}
