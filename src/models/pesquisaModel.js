var database = require("../database/config");

function pesquisar(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisar()");
    var instrucaoSql = `
        SELECT 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.username,
            u.imgPerfil,
            COUNT(DISTINCT l.idCurtida) AS curtida,
            COUNT(DISTINCT c.idComentario) AS comentario,
            COUNT(DISTINCT v.idVisualizacao) AS visualizacao
        FROM publicacao AS p
            INNER JOIN usuario AS u 
                ON p.fkUsuario = u.idUsuario
            LEFT JOIN curtida AS l
                ON l.fkPublicacao = p.idPublicacao
            LEFT JOIN comentario AS c
                ON c.fkPublicacao = p.idPublicacao
            LEFT JOIN visualizacao AS v
                ON v.fkPublicacao = p.idPublicacao
            LEFT JOIN tag_publicacao AS tp
                ON tp.fkPublicacao = p.idPublicacao
			LEFT JOIN tag AS t
				ON tp.fkTag = t.idTag
            WHERE u.nome LIKE '%${texto}%'
                OR u.username LIKE '%${texto}%'
                OR p.titulo LIKE '%${texto}%'
                OR p.descricao LIKE '%${texto}%'
                OR t.nome LIKE '%${texto}%'
                AND p.isDeleted = false
            GROUP BY 
                p.idPublicacao, 
                p.fkUsuario, 
                p.imgPublicacao, 
                p.descricao, 
                p.dtPublicacao,
                p.titulo, 
                u.idUsuario, 
                u.username,
                u.imgPerfil
                ORDER BY p.dtPublicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisar
}
