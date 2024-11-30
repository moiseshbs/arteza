function listarTag() {
    fetch("/tags/listarTop").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_teste");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {
                        var tag = resposta[i];

                        var imgPubli;

                        if (tag.imgPublicacao == null) {
                            var aleatorio = parseInt(Math.random() * 14 + 2);
                            imgPubli = `exemplos/${aleatorio}.jpg`;
                        } else {
                            imgPubli = tag.imgPublicacao;
                        }

                        div_tags.innerHTML += `
                            <div class="areaTag" onclick="feedTag(${tag.idTag})">
                                <div class="areaFotoPerfil">
                                    <img src="../assets/publicacao/${imgPubli}">
                                </div>
                                <p>${tag.nome}</p>
                            </div>
                        `;
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

function listarUsuario() {
    fetch("/usuarios/listar").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_teste");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                resposta.json().then(function (resposta) {
                    // console.log("Dados recebidos: ", JSON.stringify(resposta));

                    for (let i = 0; i < resposta.length; i++) {
                        var usuario = resposta[i];

                        div_usuario.innerHTML += `
                            <div class="areaConta" onclick="perfil(${usuario.idUsuario})">
                                <div class="areaFotoPerfil">
                                    <img src="../assets/publicacao/${usuario.imgPerfil}">
                                </div>
                                <p>${usuario.nome}</p>
                            </div>
                        `;
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

function listarPublicacao() {
    fetch("/publicacoes/listarTop").then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                var feed = document.getElementById("feed_teste");
                var mensagem = document.createElement("span");
                mensagem.innerHTML = "Nenhum resultado encontrado."
                feed.appendChild(mensagem);
                throw "Nenhum resultado encontrado!!";
            } else {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));


                    var publicacaoTop1 = resposta[0];
                    var tituloPublicacao = ''
                    if ((publicacaoTop1.titulo).length > 8) {
                        for (var i = 0; i < 8; i++) {
                            tituloPublicacao += publicacaoTop1.titulo[i];
                        }

                        tituloPublicacao += `...`;
                    } else {
                        tituloPublicacao = publicacaoTop1.titulo;
                    }

                    titulo_publi.onclick = function () {
                        publicacao(publicacaoTop1.idPublicacao);
                        ;
                    }

                    titulo_publi.innerText = `${tituloPublicacao}`;
                    descricao_publi.innerText = `${publicacaoTop1.descricao}`;

                    usernameTop.innerText = `${publicacaoTop1.username}`;
                    usernameTop.onclick = function () {
                        perfil(publicacaoTop1.idUsuario);
                        ;
                    }
                    fotoPerfilTop.innerHTML = `
                        <img src="../assets/publicacao/${publicacaoTop1.imgPerfil}" onclick="perfil(${publicacaoTop1.idUsuario})" alt="Arte">
                    `;

                    numero_interacao.innerText = `${publicacaoTop1.interacao}`;

                    div_arte.innerHTML = `
                    <img src="../assets/publicacao/${publicacaoTop1.imgPublicacao}" onclick="publicacao(${publicacaoTop1.idPublicacao})" alt="Arte">
                    `;

                    // TOP 2
                    var publicacaoTop2 = resposta[1];
                    interacao_top2.innerText = `${publicacaoTop2.interacao}`;
                    div_arte2.innerHTML = `
                    <img src="../assets/publicacao/${publicacaoTop2.imgPublicacao}" onclick="publicacao(${publicacaoTop2.idPublicacao})" alt="Arte">
                    `;

                    // TOP 3
                    var publicacaoTop3 = resposta[2];
                    interacao_top3.innerText = `${publicacaoTop3.interacao}`;
                    div_arte3.innerHTML = `
                    <img src="../assets/publicacao/${publicacaoTop3.imgPublicacao}" onclick="publicacao(${publicacaoTop3.idPublicacao})" alt="Arte">
                    `;
                });
            }

        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function feedTag(idTag) {
    sessionStorage.ID_TAG = idTag;

    var curtida_usuario = [];

    fetch(`/publicacoes/listarTag/${idTag}`).then(function (resposta) {
        if (resposta.ok) {
            window.location = "../feed/feedTag.html";
        } else {
            alerta('Erro ao listar feed', 'erro');
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);

    });
}