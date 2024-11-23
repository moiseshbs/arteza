var database = require("../database/config");

function comentar(idPublicacao, idUsuario, comentario) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentar(): ", idPublicacao, idUsuario, comentario);
    var instrucaoSql = `
        INSERT INTO comentario (fkPublicacao, fkUsuario, comentario) VALUES ('${idPublicacao}', '${idUsuario}', '${comentario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarComentario(idPublicacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComentario()");
    var instrucaoSql = `
        SELECT
            c.idComentario AS idComentarioPrincipal,
            c.comentario AS comentarioPrincipal,
            DATE_FORMAT(c.dtComentario, '%Y-%m-%dT%T') AS dtComentarioPrincipal,
            c.fkUsuario AS fkUsuarioPrincipal,
            u.username AS usernamePrincipal,
            u.imgPerfil AS imgPerfilPrincipal,
            r.idComentario AS idResposta,
            r.comentario AS resposta,
            r.dtComentario AS dtResposta,
            r.fkUsuario AS fkUsuarioResposta,
            ur.username AS usernameResposta,
            ur.imgPerfil AS imgPerfilResposta
        FROM comentario AS c
        JOIN usuario AS u ON c.fkUsuario = u.idUsuario
        LEFT JOIN comentario AS r ON r.fkResposta = c.idComentario
        LEFT JOIN usuario AS ur ON r.fkUsuario = ur.idUsuario
        WHERE c.fkPublicacao = ${idPublicacao} AND c.fkResposta IS NULL
        ORDER BY c.dtComentario DESC, r.dtComentario ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    comentar,
    listarComentario
}
