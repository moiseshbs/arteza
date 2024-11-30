var database = require("../database/config");

function listar() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
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
            WHERE p.isDeleted = false
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

function pesquisarDescricao(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisarDescricao()");
    var instrucaoSql = `
        SELECT 
            a.id AS idAviso,
            a.titulo,
            a.descricao,
            a.fk_usuario,
            u.id AS idUsuario,
            u.nome,
            u.email,
            u.senha
        FROM aviso a
            INNER JOIN usuario u
                ON a.fk_usuario = u.id
        WHERE a.descricao LIKE '${texto}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorTag(idTag) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorTag()");
    var instrucaoSql = `
         SELECT
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario,
            u.nome,
            u.username,
            u.email,
            u.senha,
            u.imgPerfil,
            t.nome AS nomeTag,
            COUNT(DISTINCT l.idCurtida) AS curtida,
            COUNT(DISTINCT c.idComentario) AS comentario,
            COUNT(DISTINCT v.idVisualizacao) AS visualizacao
        FROM usuario AS u
            LEFT JOIN publicacao AS p 
                ON p.fkUsuario = u.idUsuario AND p.isDeleted = false
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
        WHERE t.idTag = ${idTag}
        GROUP BY 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.nome, 
            u.username, 
            u.email, 
            u.senha, 
            u.imgPerfil,
            t.nome
        ORDER BY p.dtPublicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()");
    var instrucaoSql = `
        SELECT
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario,
            u.nome,
            u.username,
            u.email,
            u.senha,
            u.imgPerfil,
            COUNT(DISTINCT l.idCurtida) AS curtida,
            COUNT(DISTINCT c.idComentario) AS comentario,
            COUNT(DISTINCT v.idVisualizacao) AS visualizacao
        FROM usuario AS u
            LEFT JOIN publicacao AS p 
                ON p.fkUsuario = u.idUsuario AND p.isDeleted = false
            LEFT JOIN curtida AS l
                ON l.fkPublicacao = p.idPublicacao
            LEFT JOIN comentario AS c
                ON c.fkPublicacao = p.idPublicacao
            LEFT JOIN visualizacao AS v
                ON v.fkPublicacao = p.idPublicacao
        WHERE u.idUsuario = ${idUsuario}
        GROUP BY 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.nome, 
            u.username, 
            u.email, 
            u.senha, 
            u.imgPerfil
        ORDER BY p.dtPublicacao DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarPorId(idPublicacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorId()");
    var instrucaoSql = `
        SELECT
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            DATE_FORMAT(p.dtPublicacao, '%Y-%m-%dT%T') AS dtPublicacao,
            p.titulo, 
            u.idUsuario,
            u.nome,
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
            WHERE p.idPublicacao = ${idPublicacao}
        GROUP BY 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.username,
            u.imgPerfil;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// função async para ao mesmo tempo cadastrar tags
async function publicar(idUsuario, descricao, titulo, imagem, lista_tags) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, descricao, titulo, imagem);
    
    var instrucaoSql = `
        INSERT INTO publicacao (fkUsuario, descricao, titulo, imgPublicacao) VALUES ('${idUsuario}', '${descricao}', '${titulo}', '${imagem}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    
    resultadoQuery = await database.executar(instrucaoSql);

    var resultadoCadastroTag = await cadastrarTags(resultadoQuery.insertId, lista_tags);
    return resultadoQuery, resultadoCadastroTag;
}

async function cadastrarTags(idPublicacao, lista_tags) {
    var mensagem = "INSERT INTO tag_publicacao (fkTag, fkPublicacao) VALUES";

    for (var i = 0; i < lista_tags.length; i++) {
        mensagem += `('${lista_tags[i]}', '${idPublicacao}')`;

        if (i < lista_tags.length - 1) {
            mensagem += ",";
        }
    }

    var instrucaoSql = `
        ${mensagem};
    `;

    return database.executar(instrucaoSql);
}

function editar(idPublicacao, titulo, descricao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", idPublicacao, titulo, descricao);
    var instrucaoSql = `
        UPDATE publicacao SET titulo = '${titulo}', descricao = '${descricao}' WHERE idPublicacao = ${idPublicacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idPublicacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPublicacao);
    var instrucaoSql = `
        UPDATE publicacao SET isDeleted = true WHERE idPublicacao = ${idPublicacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function recuperar(idPublicacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idPublicacao);
    var instrucaoSql = `
        UPDATE publicacao SET isDeleted = false WHERE idPublicacao = ${idPublicacao};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function visualizar(idPublicacao, idUsuario) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idPublicacao, idUsuario);
    var instrucaoSql = `
        INSERT INTO visualizacao (fkPublicacao, fkUsuario) VALUES ('${idPublicacao}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarTop() {
    console.log("ACESSEI O AVISO  MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
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
            (SELECT 
            COUNT(DISTINCT l.idCurtida)+
            COUNT(DISTINCT c.idComentario)+
            COUNT(DISTINCT v.idVisualizacao)) AS interacao
        FROM publicacao AS p
            INNER JOIN usuario AS u 
                ON p.fkUsuario = u.idUsuario
            LEFT JOIN curtida AS l
                ON l.fkPublicacao = p.idPublicacao
            LEFT JOIN comentario AS c
                ON c.fkPublicacao = p.idPublicacao
            LEFT JOIN visualizacao AS v
                ON v.fkPublicacao = p.idPublicacao
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
                ORDER BY interacao DESC LIMIT 3;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorTag,
    listarPorUsuario,
    listarPorId,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    recuperar,
    visualizar,
    cadastrarTags,
    listarTop
}
