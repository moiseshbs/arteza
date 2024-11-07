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

    input_tag.value = '';
}

const foto = document.getElementById('foto');
const preview = document.getElementById('preview');

foto.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            preview.src = event.target.result; // Define o src da imagem para a prévia
            preview.style.display = 'block'; // Mostra a imagem
            // btnEscolherImg.style.display = 'none';
            btnEscolherImg.innerHTML = '';
        };
        reader.readAsDataURL(file); // Lê o arquivo como URL de dados
    } else {
        preview.src = ""; // Limpa a prévia se nenhum arquivo for selecionado
        preview.style.display = 'none'; // Esconde a imagem
    }
});
