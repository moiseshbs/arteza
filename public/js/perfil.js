var seguidor = 0;
var botao = ``;

function follow() {
    seguidor++;

    btn_unfollow.style.display = 'block';
    btn_follow.style.display = 'none';

    span_numSeguidor.innerHTML = seguidor;
}

function unfollow() {
    seguidor--;

    btn_unfollow.style.display = 'none';
    btn_follow.style.display = 'block';

    span_numSeguidor.innerHTML = seguidor;
}