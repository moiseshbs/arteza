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
            COUNT(DISTINCT l.qtdCurtida) AS curtida,
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
            COUNT(DISTINCT l.qtdCurtida) AS curtida,
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
            WHERE u.idUsuario = ${idUsuario}
        GROUP BY 
            p.idPublicacao, 
            p.fkUsuario, 
            p.imgPublicacao, 
            p.descricao, 
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario, 
            u.username
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
            p.dtPublicacao,
            p.titulo, 
            u.idUsuario,
            u.nome,
            u.username,
            u.imgPerfil,
            COUNT(DISTINCT l.qtdCurtida) AS curtida,
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

function listarComentario(idPublicacao) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComentario()");
    var instrucaoSql = `
        SELECT
            c.comentario,
            c.dtComentario,
            u.username,
            u.imgPerfil
        FROM comentario AS c
            JOIN usuario AS u
                ON c.fkUsuario = u.idUsuario
            WHERE c.fkPublicacao = '${idPublicacao}'
            ORDER BY dtComentario DESC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarCurtida(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarCurtida()");
    var instrucaoSql = `
        SELECT
            l.fkPublicacao,
            l.fkUsuario
        FROM curtida AS l
            WHERE fkUsuario = '${idUsuario}';
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

function editar(novaDescricao, idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editar(): ", novaDescricao, idAviso);
    var instrucaoSql = `
        UPDATE aviso SET descricao = '${novaDescricao}' WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletar(idAviso) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM aviso WHERE id = ${idAviso};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function curtir(idPublicacao, idUsuario) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idPublicacao, idUsuario);
    var instrucaoSql = `
        INSERT INTO curtida (fkPublicacao, fkUsuario) VALUES ('${idPublicacao}', '${idUsuario}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function descurtir(idPublicacao, idUsuario) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idPublicacao, idUsuario);
    var instrucaoSql = `
        DELETE FROM curtida WHERE fkPublicacao = '${idPublicacao}' AND fkUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function comentar(idPublicacao, idUsuario, comentario) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function comentar(): ", idPublicacao, idUsuario, comentario);
    var instrucaoSql = `
        INSERT INTO comentario (fkPublicacao, fkUsuario, comentario) VALUES ('${idPublicacao}', '${idUsuario}', '${comentario}');
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
            COUNT(DISTINCT l.qtdCurtida) AS curtida,
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
                GROUP BY 
                p.idPublicacao, 
                p.fkUsuario, 
                p.imgPublicacao, 
                p.descricao, 
                p.dtPublicacao,
                p.titulo, 
                u.idUsuario, 
                u.username
                ORDER BY curtida DESC LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    listar,
    listarPorUsuario,
    listarPorId,
    pesquisarDescricao,
    publicar,
    editar,
    deletar,
    curtir,
    descurtir,
    comentar,
    listarComentario,
    visualizar,
    listarCurtida,
    cadastrarTags,
    listarTop
}
