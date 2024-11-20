// função para comentar na publicação
function comentar() {
    // variaveis vindo do formulario de cadastro
    var comentarioVar = input_comentario.value;

    if (comentarioVar == "") {
        return false;
    } else {
        setInterval(5000);
    }

    // enviando o valor da input
    fetch(`/comentarios/comentar/${sessionStorage.ID_PUBLICACAO}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            comentarioServer: comentarioVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Comentario realizado com sucesso!");

                listaComentario_teste.innerHTML = "";
                input_comentario.value = "";

                atualizarComentario();
                contarComentario();
            } else {
                throw "Houve um erro ao tentar comentar!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

// função para listar os comentarios de uma publicação por ID
function atualizarComentario() {
    fetch(`/comentarios/listarComentario/${sessionStorage.ID_PUBLICACAO}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var listaComentario = document.getElementById("listaComentario_teste");
                var mensagem = document.createElement("div");
                mensagem.innerHTML = `
                    <div class="comentario">
                        <span>Seja o primeiro a comentar...</span>
                    </div>`
                listaComentario.appendChild(mensagem);
            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    var fotoPerfil = '';
                    var fotoPerfilResposta = '';
                    var comentarioResposta = '';
                    var botaoMostrar = '';

                    for (let i = 0; i < resposta.length; i++) {
                        var comentario = resposta[i];

                        if (comentario.imgPerfilPrincipal == null) {
                            fotoPerfil = 'padrao.jpg';
                        } else {
                            fotoPerfil = comentario.imgPerfilPrincipal;
                        }

                        if (comentario.imgPerfilResposta == null) {
                            fotoPerfilResposta = 'padrao.jpg';
                        } else {
                            fotoPerfilResposta = comentario.imgPerfilResposta;
                        }

                        if (comentario.resposta == null) {
                            comentarioResposta = '';
                            botaoMostrar = '';
                        } else {
                            comentarioResposta = `
                            <div class="comentario comentarioResposta" id="respostaComent_${comentario.idComentarioPrincipal}">
                                <div class="areaFotoPerfil" onclick="perfil(${comentario.fkUsuarioResposta})">
                                    <img src="../assets/publicacao/${fotoPerfilResposta}" class="fotoPerfil">
                                </div>
                                <div class="contComentario">
                                    <h4 onclick="perfil(${comentario.fkUsuarioResposta})">${comentario.usernameResposta}</h4>
                                    <span>${comentario.resposta}</span>
                                </div>
                            </div>
                            `;

                            botaoMostrar = `
                                <p class="btnMostrarMais" onclick="mostrarResposta(${comentario.idComentarioPrincipal});">Mostrar resposta</p>
                            `;
                        }

                        listaComentario_teste.innerHTML += `
                            <div class="comentario">
                                <div class="areaFotoPerfil" onclick="perfil(${comentario.fkUsuarioPrincipal})">
                                    <img src="../assets/publicacao/${fotoPerfil}" class="fotoPerfil">
                                </div>
                                <div class="contComentario">
                                    <h4 onclick="perfil(${comentario.fkUsuarioPrincipal})">${comentario.usernamePrincipal}</h4>
                                    <span>${comentario.comentarioPrincipal}</span>
                                    ${botaoMostrar}
                                </div>
                            </div>

                            ${comentarioResposta}
                        `;
                    }

                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
        finalizarAguardar();
    });
}

// função que incrementa um quando um comentario é realizado
function contarComentario() {
    var spanComentario = document.getElementById(`span_comentario`);

    spanComentario.innerText = Number(spanComentario.innerText) + 1;
}