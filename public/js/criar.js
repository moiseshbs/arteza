var contarTags = 0;
var lista_tags = [];

function buscarTag() {
    var texto = input_tag.value;

    if (texto != '') {
        fetch(`/tags/recomendacao/${texto}`).then(function (resposta) {
            if (resposta.ok) {
                if (resposta.status == 204) {
                    barraTags.innerHTML = `
                            <p>Tag não encontrada :(</p>
                        `;
                } else {
                    resposta.json().then(function (resposta) {
                        // console.log("Dados recebidos: ", JSON.stringify(resposta));
                        barraTags.style.display = 'flex';

                        for (let i = 0; i < resposta.length; i++) {
                            var tag = resposta[i];

                            barraTags.innerHTML = `
                                <p onclick="tags(${tag.idTag}, '${tag.nome}')">${tag.nome}</p>
                                `;
                        }
                    });
                }
            } else {
                alerta(`Houve um erro ao buscar tags`, 'erro');
                throw ('Houve um erro na API!');
            }
        }).catch(function (resposta) {
            console.error(resposta);
        });
    } else {
        barraTags.style.display = 'none';
    }
}
function tags(idTag, nomeTag) {

    var posicaoTag = lista_tags.indexOf(idTag);

    if (posicaoTag == -1) {
        areaTags.innerHTML += `<div onclick="removerTag(${idTag})" class="btnTag" id="tag_${idTag}">${nomeTag} <i class="bi bi-x-lg"></i></div>`;
        lista_tags.push(idTag);

        contarTags++;
        span_qtdTags.innerHTML = contarTags;
    }

    console.log(lista_tags);

    input_tag.value = '';
    barraTags.style.display = 'none';
}

function removerTag(idTag) {

    var posicaoTag = lista_tags.indexOf(idTag);
    if (posicaoTag !== -1) {
        lista_tags.splice(posicaoTag, 1);
    }

    contarTags--;
    span_qtdTags.innerHTML = contarTags;

    var tagElemento = document.getElementById(`tag_${idTag}`);

    tagElemento.style.display = 'none';

    console.log(lista_tags);
}

const foto = document.getElementById('foto'); //input tipo file
const preview = document.getElementById('preview'); //tag <img> onde mostra a imagem

//quando seleciona uma img chama essa funcao
foto.addEventListener('change', function () {
    const file = this.files[0];
    if (file) { //verifica se um arquivo foi selecionado
        const reader = new FileReader();

        reader.onload = function (event) {
            preview.src = event.target.result; //define o src da imagem para a prévia
            preview.style.display = 'block';
            // btnEscolherImg.style.display = 'none';
            btnEscolherImg.innerHTML = '';
        };
        reader.readAsDataURL(file); //le o arquivo como URL de dados
    } else {
        preview.src = "";
        preview.style.display = 'none';
    }
});

function publicar() {
    var tituloVar = input_titulo.value;
    var descricaoVar = input_desc.value;

    const formData = new FormData();
    formData.append('foto', foto.files[0]);
    formData.append('titulo', tituloVar);
    formData.append('descricao', descricaoVar);
    formData.append('lista', JSON.stringify(lista_tags)); // envia a lista como string json

    var idUsuario = sessionStorage.ID_USUARIO;

    // bordas de erro e acerto no input
    var bordaVerde = 'solid 1px green';
    var bordaVermelha = 'solid 1px red';


    if (tituloVar == "" || descricaoVar == "") {
        input_titulo.style.border = bordaVermelha;
        input_desc.style.border = bordaVermelha;
        return false;
    } else {
        fetch(`/publicacoes/publicar/${idUsuario}`, {
            method: "POST",
            body: formData,
        }).then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log("Publicação realizado com sucesso! Redirecionando para tela de publicação...");

                btnAvancar.innerHTML = '<img src="../assets/componentes/loading.gif" height="70%">';
                input_titulo.style.border = bordaVerde;
                input_desc.style.border = bordaVerde;

                alerta(`Publicado com sucesso!`, 'sucesso');

                setTimeout(() => {
                    window.location = '../feed/feed.html';
                }, "1000");

            } else {
                alerta(`Publicado com sucesso!`, 'sucesso');

                setTimeout(() => {
                    window.location = '../feed/feed.html';
                }, "1000");

                throw "Houve um erro ao tentar publicar!";
            }
        })
            .catch(function (resposta) {
                alerta(`Publicado com sucesso!`, 'sucesso');
                // alerta(`${resposta}: Houve um erro interno ao publicar`, 'erro');
                console.log(`#ERRO: ${resposta}`);
            });

        return false;
    }
}