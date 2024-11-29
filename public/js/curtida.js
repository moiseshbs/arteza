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
                atualizarFeed(curtiu); // atualizo o feed passando o vetor com as curtidas do usuario
            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {
                        var curtida = resposta[i];

                        curtiu.push(curtida.fkPublicacao);
                    }

                    atualizarFeed(curtiu); // atualizo o feed passando o vetor com as curtidas do usuario

                });
            }
        } else {
            alerta('Houve um erro ao listar curtidas!', 'erro');
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
            // console.log("Resposta: ", resposta);

            if (resposta.ok) {
                // console.log("Curtida realizada com sucesso pelo usuario" + sessionStorage.getItem("USERNAME_USUARIO"));

                like(idPublicacao);

            } else {
                if (resposta.status == 500) {
                    // console.log("voce ja curtiu!")

                    like(idPublicacao);
                }
                alerta('Houve um erro ao curtir a publicação!', 'erro');
                throw "Houve um erro ao tentar curtir a publicação!";
            }
        })
        .catch(function (erro) {
            alerta(`${erro}: Houve um erro interno ao curtir publicação`, 'erro');
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
            // console.log("Resposta: ", resposta);

            if (resposta.ok) {
                // console.log("descurtida realizada com sucesso pelo usuario" + sessionStorage.getItem("USERNAME_USUARIO"));

                deslike(idPublicacao);

            } else {
                alerta('Houve um erro ao retirar curtida', 'erro');
                throw "Houve um erro ao tentar descurtir a publicação!";
            }
        })
        .catch(function (erro) {
            alerta(`${erro}: Houve um erro interno ao retirar curtida`, 'erro');
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

function like(idPublicacao) {
    var divDeslike = document.getElementById(`div_deslike_${idPublicacao}`);
    var divLike = document.getElementById(`div_like_${idPublicacao}`);
    divLike.style.display = 'none';
    divDeslike.style.display = 'block';

    var spanDeslike = document.getElementById(`span_deslike_${idPublicacao}`);
    var spanLike = document.getElementById(`span_like_${idPublicacao}`);
    spanLike.innerText = Number(spanLike.innerText) + 1;
    spanDeslike.innerText = Number(spanLike.innerText);
}

function deslike(idPublicacao) {
    var divDeslike = document.getElementById(`div_deslike_${idPublicacao}`);
    var divLike = document.getElementById(`div_like_${idPublicacao}`);
    divLike.style.display = 'block';
    divDeslike.style.display = 'none';

    var spanDeslike = document.getElementById(`span_deslike_${idPublicacao}`);
    var spanLike = document.getElementById(`span_like_${idPublicacao}`);

    spanDeslike.innerText = Number(spanDeslike.innerText) - 1;
    spanLike.innerText = Number(spanDeslike.innerText);
}