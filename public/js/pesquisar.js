function pesquisar() {
    var textoServer = input_pesquisa.value;

    if (textoServer == '') {
        div_pesquisa.innerHTML = `
            <div class="pin_container" id="feed_teste">

            </div>
        `;

        atualizarFeed(curtida_usuario); // curtida_usuario é uma variavel global que possui as curtidas do usuario
    } else {

    }

    if (textoServer.length > 2) {
        fetch(`/pesquisas/pesquisar/${textoServer}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.status == 204) {
                        // var listaComentario = document.getElementById("listaComentario_teste");
                        // var mensagem = document.createElement("span");
                        // mensagem.innerHTML = "Nenhum feedback."
                        // listaComentario.appendChild(mensagem);
                        // throw "Nenhum feedback!!";
                        // div_barra.innerHTML = ``;
                    }

                    resposta.json().then(function (resposta) {
                        // console.log("Dados recebidos: ", JSON.stringify(resposta));

                        var fotoPerfil = '';

                        for (let i = 0; i < resposta.length; i++) {
                            var publicacao = resposta[i];

                            var feed = document.getElementById("feed_teste");
                            feed.innerHTML = "";

                            var aleatorio = 0;
                            var estilo = ``;
                            var botao = ``;
                            var lista_publicacoes = [];

                            for (let i = 0; i < resposta.length; i++) {
                                var publicacao = resposta[i];

                                aleatorio = parseInt(Math.random() * 3 + 1);

                                if (aleatorio == 1) {
                                    estilo = `card_small`;
                                } else if (aleatorio == 2) {
                                    estilo = `card_medium`;
                                } else {
                                    estilo = `card_large`;
                                }

                                lista_publicacoes.push(publicacao.idPublicacao);

                                var inclui = curtida_usuario.includes(lista_publicacoes[i]);

                                if (inclui) {
                                    console.log(`inclui? ${lista_publicacoes[i]}. ${inclui}`)
                                    botao = `
                                        <div onclick="descurtir(${publicacao.idPublicacao})" id="div_deslike_${publicacao.idPublicacao}" class="deslike" style="display: block">
                                            <i class="bi bi-heart-fill curtida"></i>
                                            <span id="span_deslike_${publicacao.idPublicacao}">${publicacao.curtida}</span>
                                        </div>
                                        <div onclick="curtir(${publicacao.idPublicacao})" id="div_like_${publicacao.idPublicacao}" class="like" style="display: none">
                                            <i class="bi bi-heart"></i>
                                            <span id="span_like_${publicacao.idPublicacao}">${publicacao.curtida}</span>
                                        </div>
                                    `;
                                } else {
                                    botao = `
                                        <div onclick="curtir(${publicacao.idPublicacao})" id="div_like_${publicacao.idPublicacao}" class="like" style="display: block">
                                            <i class="bi bi-heart"></i>
                                            <span id="span_like_${publicacao.idPublicacao}">${publicacao.curtida}</span>
                                        </div>
                                        <div onclick="descurtir(${publicacao.idPublicacao})" id="div_deslike_${publicacao.idPublicacao}" class="deslike" style="display: none">
                                            <i class="bi bi-heart-fill curtida"></i>
                                            <span id="span_deslike_${publicacao.idPublicacao}">${publicacao.curtida}</span>
                                        </div>
                                    `;
                                }

                                if (publicacao.imgPerfil == null) {
                                    fotoPerfil = 'padrao.jpg';
                                } else {
                                    fotoPerfil = publicacao.imgPerfil;
                                }

                            
                                    feed_teste.innerHTML += `
                                                <div class="card ${estilo}">
                                                    <a class="click" onclick="publicacao(${publicacao.idPublicacao})">
                                                        <img src="../assets/publicacao/${publicacao.imgPublicacao}" alt="Publicação">
                                                    </a>
                                                    <div class="info">
                                                        <div class="options">
                                                            <div id="div_botao">
                                                                
                                                                ${botao}
                                                                
                                                            </div>
                    
                                                            <div>
                                                                <i class="bi bi-chat"></i>
                                                                <span>${publicacao.comentario}</span>
                                                            </div>
                    
                                                            <div>
                                                                <i class="bi bi-eye"></i>
                                                                <span>${publicacao.visualizacao}</span>
                                                            </div>
                                                        </div>
                    
                                                        <a onclick="perfil(${publicacao.idUsuario})">
                                                            <div class="infoUser">
                                                                <div class="areaFotoPerfil">
                                                                    <img src="../assets/publicacao/${fotoPerfil}" alt="">
                                                                </div>
                                                                <h2>${publicacao.username}</h2>
                    
                                                            </div>
                                                        </a>
                                                    </div>
                                                </div>
                                            `;
                            }

                        }
                    });
                } else {
                    // div_barra.innerHTML = "";
                    alerta(`Houve um erro ao pesquisar!`, 'erro');
                    throw ('Houve um erro na API!');
                }
            }).catch(function (resposta) {
                alerta(`${resposta}: Houve um erro interno ao pesquisar!`, 'erro');
                console.error(resposta);
            });
    }
}
