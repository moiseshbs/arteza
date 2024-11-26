// sessão
function validarSessao() {
    var username = sessionStorage.USERNAME_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;
    var foto = sessionStorage.FOTO_USUARIO;

    var user_nome = document.getElementById("user_nome");
    var user_username = document.getElementById("user_username");
    var user_foto = document.getElementById("header_imgPerfil")

    if(foto == 'null') {
        foto = 'padrao.jpg';
    }

    if (username != null && nome != null) {
        // user_nome.innerHTML = nome;
        // user_username.innerHTML = username;
        user_foto.innerHTML = `<img src="../assets/publicacao/${foto}" alt="" class="fotoPerfil">`;
        user_foto.setAttribute("onclick", `abrirDrop()`);

    } else {
        window.location = "../login.html";
    }
}

function abrirDrop() {
    if (dropDownPerfil.style.display == "" || dropDownPerfil.style.display == "none") {
        dropDownPerfil.style.display = "flex";
    } else {
        dropDownPerfil.style.display = "none";
    }
}

function perfil(idUsuario) {
    sessionStorage.ID_USUARIOPUBLICACAO = idUsuario;

    var idUsuarioPublicacao = idUsuario;
    var idUsuarioLogado = sessionStorage.ID_USUARIO;
    var idUsuarioVar;

    if (idUsuarioPublicacao == idUsuarioLogado) {
        idUsuarioVar = idUsuarioLogado;
    } else {
        idUsuarioVar = idUsuarioPublicacao;
    }

    fetch(`/publicacoes/listar/${idUsuarioVar}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(function (resposta) {
            console.log("Resposta: ", resposta);

            if (resposta.ok) {
                window.location = "../perfil/perfil.html";
            } else {
                alerta('Erro ao buscar usuário', 'erro');
                throw "Houve um erro ao tentar buscar usuario!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}


function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}