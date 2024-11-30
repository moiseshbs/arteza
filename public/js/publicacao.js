var visualizacao = 0;
var like = 0;

function contarVisualizacao() {
    visualizacao++;

    span_visualizacao.innerHTML = visualizacao;
}

function contarLike() {
    like++;

    div_like.style.display = 'none';
    div_deslike.style.display = 'block';

    span_deslike.innerHTML = like;
}

function removerLike() {
    like--;

    div_like.style.display = 'block';
    div_deslike.style.display = 'none';

    span_like.innerHTML = like;
}

function publicacao(idPublicacao) {
    sessionStorage.ID_PUBLICACAO = idPublicacao;

    fetch(`/publicacoes/listarID/${idPublicacao}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(function (resposta) {
            console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("Publicacao encontrado com sucesso!");
                visualizar(idPublicacao);
                window.location = "../feed/publicacao.html";
            } else {
                throw "Houve um erro ao tentar buscar Publicacao!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}