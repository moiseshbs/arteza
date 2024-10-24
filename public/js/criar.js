var contarTags = 0;

function verificarEnter(event) {
    if (event.key === 'Enter') {
        tags();
    }
}

function tags() {
    var tag = input_tag.value;
    
    areaTags.innerHTML += `<button onclick="" class="btnTag">${tag}</button>`;
    
    contarTags++;

    span_qtdTags.innerHTML = contarTags;
}