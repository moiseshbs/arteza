var database = require("../database/config");

function pesquisar(texto) {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pesquisar()");
    var instrucaoSql = `
        SELECT 
            u.idUsuario,
            u.nome,
            u.username,
            u.imgPerfil,
            p.titulo,
            p.descricao
        FROM usuario AS u
            JOIN publicacao AS p
                ON p.fkUsuario = u.idUsuario
        WHERE u.nome LIKE '%${texto}%'
        OR u.username LIKE '%${texto}%'
        OR p.titulo LIKE '%${texto}%'
        OR p.descricao LIKE '%${texto}%';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    pesquisar
}
