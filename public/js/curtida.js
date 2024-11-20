// função que lista as curtidas
function listarCurtida() {
    var idUsuario = sessionStorage.ID_USUARIO;
    
    var curtiu = []; // vetor para armazenar as publicações que o usuario já curtiu

    fetch(`/curtidas/listarCurtida/${idUsuario}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                // var listaComentario = document.getElementById("listaComentario_teste");
                // var mensagem = document.createElement("div");
                // mensagem.innerHTML = `
                // <div class="comentario">
                //     <span>Seja o primeiro a comentar...</span>
                // </div>`
                // listaComentario.appendChild(mensagem);
            } else {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {
                        var curtida = resposta[i];

                        curtiu.push(curtida.fkPublicacao);
                    }

                    atualizarFeed(curtiu); // atualizo o feed passando o vetor com as curtidas do usuario

                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

// função para curtir publicação
function curtir(idPublicacao) {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/curtidas/curtir/${idPublicacao}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            idPublicacaoServer: idPublicacao,
        }),
    })
        .then(function (resposta) {
            console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("Curtida realizada com sucesso pelo usuario" + sessionStorage.getItem("USERNAME_USUARIO"));

                like(idPublicacao);

            } else {
                if (resposta.status == 500) {
                    console.log("voce ja curtiu!")

                    like();
                }
                throw "Houve um erro ao tentar curtir a publicação!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

// função para remover a curtida
function descurtir(idPublicacao) {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/curtidas/descurtir/${idPublicacao}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            idPublicacaoServer: idPublicacao,
        }),
    })
        .then(function (resposta) {
            console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("descurtida realizada com sucesso pelo usuario" + sessionStorage.getItem("USERNAME_USUARIO"));

                deslike();

            } else {
                throw "Houve um erro ao tentar descurtir a publicação!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

function like() {
    var spanDeslike = document.getElementById(`span_deslike`);
    var spanLike = document.getElementById(`span_like`);
    div_like.style.display = 'none';
    div_deslike.style.display = 'block';

    spanLike.innerText = Number(spanLike.innerText) + 1;
    spanDeslike.innerText = Number(spanLike.innerText);
}

function deslike() {
    var spanDeslike = document.getElementById(`span_deslike`);
    var spanLike = document.getElementById(`span_like`);
    div_like.style.display = 'block';
    div_deslike.style.display = 'none';

    spanDeslike.innerText = Number(spanDeslike.innerText) - 1;
    spanLike.innerText = Number(spanDeslike.innerText);
}