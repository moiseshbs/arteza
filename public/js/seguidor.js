// função que lista as curtidas
function listarSeguindo() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var usuarioPagina = sessionStorage.ID_USUARIOPUBLICACAO;

    var lista_seguindo = []; // vetor para armazenar as publicações que o usuario já curtiu

    fetch(`/seguidores/listarSeguindo/${idUsuario}`).then(function (resposta) {
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
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {
                        var seguindo = resposta[i];

                        lista_seguindo.push(seguindo.fkSeguido);
                    }

                    var indiceSeguidor = lista_seguindo.indexOf(Number(usuarioPagina));

                    if (indiceSeguidor >= 0) {
                        btn_follow.style.display = 'none';
                        btn_unfollow.style.display = 'block';

                    } else {
                        btn_follow.style.display = 'block';
                        btn_unfollow.style.display = 'none';
                    }

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
function seguir() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idSeguido = sessionStorage.ID_USUARIOPUBLICACAO;

    fetch(`/seguidores/seguir/${idUsuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idSeguidoServer: idSeguido,
        }),
    })
        .then(function (resposta) {
            // console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("Seguiu com sucesso");

                follow();

            } else {
                if (resposta.status == 500) {
                    console.log("voce ja seguiu!")

                    follow();
                }
                throw "Houve um erro ao tentar seguir!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

// função para remover a curtida
function desseguir() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var idSeguido = sessionStorage.ID_USUARIOPUBLICACAO;

    fetch(`/seguidores/desseguir/${idUsuario}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idSeguidoServer: idSeguido,
        }),
    })
        .then(function (resposta) {
            // console.log("Resposta: ", resposta);

            if (resposta.ok) {
                console.log("Desseguiu com sucesso");

                unfollow();

            } else {
                throw "Houve um erro ao tentar desseguir!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

function follow() {
    var spanSeguidor = document.getElementById(`span_numSeguidor`);
    btn_follow.style.display = 'none';
    btn_unfollow.style.display = 'block';

    spanSeguidor.innerText = Number(spanSeguidor.innerText) + 1;
}

function unfollow() {
    var spanSeguidor = document.getElementById(`span_numSeguidor`);
    btn_follow.style.display = 'block';
    btn_unfollow.style.display = 'none';

    spanSeguidor.innerText = Number(spanSeguidor.innerText) - 1;
}

function listarSeguidores() {
    var idUsuario = sessionStorage.ID_USUARIO;
    var usuarioPagina = sessionStorage.ID_USUARIOPUBLICACAO;

    var usuario = 0;

    if (idUsuario == usuarioPagina) {
        usuario = idUsuario;
    } else {
        usuario = usuarioPagina;
    }

    fetch(`/seguidores/listarSeguidores/${usuario}`).then(function (resposta) {
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

                    var seguidores = resposta[0];

                    span_numSeguidor.innerText = `${seguidores.seguidor}`;
                    span_numSeguindo.innerText = `${seguidores.seguindo}`;
                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}
