
function visualizar(idPublicacao) {
    var idUsuarioVar = sessionStorage.ID_USUARIO;

    fetch(`/publicacoes/visualizar/${sessionStorage.ID_PUBLICACAO}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuarioVar,
        }),
    })
        .then(function (resposta) {
            console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("Visualização realizada com sucesso pelo usuario " + sessionStorage.getItem("USERNAME_USUARIO"));
            } else {
                alerta(`Houve um erro ao contabilizar visualização!`, 'erro');
                throw "Houve um erro ao tentar visualizar a publicação!";
            }
        })
        .catch(function (erro) {
            alerta(`${erro}: Houve um erro interno ao contabilizar visualização!`, 'erro');
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}