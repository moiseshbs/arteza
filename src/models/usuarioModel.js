var database = require("../database/config")

function autenticar(username, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", username, senha)
    var instrucaoSql = `
        SELECT idUsuario, nome, email, username, imgPerfil FROM usuario WHERE username = '${username}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, username, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, username, email, senha);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO usuario (nome, username, email, senha) VALUES ('${nome}', '${username}', '${email}', '${senha}');
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listar() {
    var instrucaoSql = `
        SELECT idUsuario, nome, imgPerfil FROM usuario;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarID(idUsuario) {
    var instrucaoSql = `
        SELECT 
            idUsuario,
            nome, 
            username,
            email,
            senha,
            imgPerfil 
        FROM usuario
            WHERE idUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizar(idUsuario, nome, username, email, senha, imagem) {
    console.log(`atualizando essa porra veia. ${nome}, ${username}, ${email}, ${senha}`)
    var instrucaoSql = `
        UPDATE usuario SET 
            nome = '${nome}', 
            username = '${username}', 
            email = '${email}',
            senha = '${senha}',
            imgPerfil = '${imagem}'
        WHERE idUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar,
    listar,
    listarID,
    atualizar
};