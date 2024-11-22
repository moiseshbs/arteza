var database = require("../database/config");

function listarSeguindo(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarCurtida()");
    var instrucaoSql = `
        SELECT
            s.fkSeguidor,
            s.fkSeguido
        FROM seguidor AS s
            WHERE s.fkSeguidor = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarSeguidores(idUsuario) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarCurtida()");
    var instrucaoSql = `

        SELECT count(fkSeguido) AS seguidor,
        (SELECT count(fkSeguidor) 
            FROM seguidor 
            WHERE fkSeguidor = ${idUsuario}) AS seguindo
        FROM seguidor 
            WHERE fkSeguido = ${idUsuario}
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function seguir(idUsuario, idSeguido) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, idSeguido);
    var instrucaoSql = `
        INSERT INTO seguidor (fkSeguidor, fkSeguido) VALUES ('${idUsuario}', '${idSeguido}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function desseguir(idUsuario, idSeguido) {
    console.log("ACESSEI O PUBLICACAO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function publicar(): ", idUsuario, idSeguido);
    var instrucaoSql = `
        DELETE FROM seguidor WHERE fkSeguidor = '${idUsuario}' AND fkSeguido = '${idSeguido}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    listarSeguindo,
    listarSeguidores,
    seguir,
    desseguir
}
