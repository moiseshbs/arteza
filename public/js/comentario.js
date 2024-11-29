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
            // console.log("resposta: ", resposta);

            if (resposta.ok) {
                // console.log("Comentario realizado com sucesso!");

                listaComentario_teste.innerHTML = "";
                input_comentario.value = "";

                atualizarComentario();
                contarComentario();
            } else {
                alerta('Houve um erro ao tentar comentar!', 'erro');
                throw "Houve um erro ao tentar comentar!";
            }
        })
        .catch(function (resposta) {
            alerta(`${erro}: Houve um erro interno ao comentar`, 'erro');
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

                        const data1 = new Date();
                        const data2 = new Date(comentario.dtComentarioPrincipal);
                        
                        var dataComentario = '';

                        const diferencaMilissegundos = data1 - data2;

                        const diferencaHoras = diferencaMilissegundos / (1000 * 60 * 60);
                        const diferencaMinutos = diferencaHoras * 60;
                        const diferencaSegundos = diferencaMinutos * 60;
                        const diferencaDias = diferencaHoras / 24;

                        if (diferencaSegundos < 60) {
                            dataComentario = `Há ${parseInt(diferencaSegundos)} segundos`;
                        } else if (diferencaHoras < 1) {
                            dataComentario = `Há ${parseInt(diferencaMinutos)} minutos`;
                        } else if (diferencaDias < 1 && diferencaHoras >= 1) {
                            dataComentario = `Há ${parseInt(diferencaHoras)} horas`;
                        } else if (diferencaDias < 1 && diferencaHoras < 24) {
                            dataComentario = 'Hoje'
                        } else {
                            dataComentario = `há ${parseInt(diferencaDias)} dias`;
                        }

                        listaComentario_teste.innerHTML += `
                            <div class="comentario">
                                <div class="areaFotoPerfil" onclick="perfil(${comentario.fkUsuarioPrincipal})">
                                    <img src="../assets/publicacao/${fotoPerfil}" class="fotoPerfil">
                                </div>
                                <div class="contComentario">
                                    <div class="headerComentario">
                                        <h4 onclick="perfil(${comentario.fkUsuarioPrincipal})">${comentario.usernamePrincipal}</h4>
                                        <span class="dtComentario">${dataComentario}</span>
                                    </div>
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
            alerta(`Houve um erro ao listar feedbacks`, 'erro');
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        alerta(`${resposta}: Houve um erro interno ao listar feedbacks`, 'erro');
        console.error(resposta);
    });
}

// função que incrementa um quando um comentario é realizado
function contarComentario() {
    var spanComentario = document.getElementById(`span_comentario`);

    spanComentario.innerText = Number(spanComentario.innerText) + 1;
}