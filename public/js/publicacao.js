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