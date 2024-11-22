function cadastrar() {
    // variaveis vindo do formulario de cadastro
    var nomeVar = input_nome.value;
    var usernameVar = input_username.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    // bordas de erro e acerto no input
    var bordaVerde = 'solid 1px green';
    var bordaVermelha = 'solid 1px red';

    // validações
    input_username.value = usernameVar.replaceAll(' ', '');
    input_email.value = emailVar.replaceAll(' ', '');
    input_senha.value = senhaVar.replaceAll(' ', '');

    var emailArroba = emailVar.includes('@');
    var tamNome = nomeVar.length;
    var tamUsername = usernameVar.length;
    var tamSenha = senhaVar.length;

    if (nomeVar == '') {
        input_nome.style.border = bordaVermelha;
    } else {
        input_nome.style.border = bordaVerde;
    }

    if (emailVar == ''){
        input_email.style.border = bordaVermelha;
    } else {
        input_email.style.border = bordaVerde;
    }

    if (senhaVar == '') {
        input_senha.style.border = bordaVermelha;
    } else {
        input_senha.style.border = bordaVerde;
    }

    if (usernameVar == '') {
        input_username.style.border = bordaVermelha;
    } else {
        input_username.style.border = bordaVerde;
    }

    if (
        nomeVar == "" ||
        emailVar == "" ||
        usernameVar == "" ||
        senhaVar == ""
    ) {
        finalizarAguardar();
        return false;
    } else if (!emailArroba) {
        input_email.style.border = bordaVermelha;

        finalizarAguardar();
        return false;
    } else if (tamNome <= 0) {
        input_nome.style.border = bordaVermelha;

        finalizarAguardar();
        return false;
    } else if (tamUsername <= 0) {
        input_username.style.border = bordaVermelha;

        finalizarAguardar();
        return false;
    } else if (tamSenha < 8) {
        input_senha.style.border = bordaVermelha;

        finalizarAguardar();
        return false;
    } else {
        input_senha.style.border = bordaVerde;
        btnAvancar.innerHTML = '<img src="assets/componentes/loading.gif" height="70%">'
        setInterval(3000);
    }

    // enviando o valor da input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            usernameServer: usernameVar,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                input_email.style.border = bordaVerde;
                input_nome.style.border = bordaVerde;
                input_username.style.border = bordaVerde;
                input_senha.style.border = bordaVerde;

                console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");
                

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function validarSession() {
    if (sessionStorage.USERNAME_USUARIO != undefined) {
        input_username.value = sessionStorage.USERNAME_USUARIO
    } else {
        input_username.value = '';
    }
}

function entrar() {
    var usernameVar = input_username.value;
    var senhaVar = input_senha.value;

    // bordas de erro e acerto no input
    var bordaVerde = 'solid 1px green';
    var bordaVermelha = 'solid 1px red';

    if (usernameVar == "" || senhaVar == "") {
        input_username.style.border = bordaVermelha;
        input_senha.style.border = bordaVermelha;

        finalizarAguardar();
        return false;
    }

    console.log("FORM LOGIN: ", usernameVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            usernameServer: usernameVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        btnAvancar.innerHTML = 'Login';
        input_username.style.border = bordaVermelha;
        input_senha.style.border = bordaVermelha;

        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                input_username.style.border = bordaVerde;
                input_senha.style.border = bordaVerde;
                btnAvancar.innerHTML = '<img src="assets/componentes/loading.gif" height="70%">'

                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.USERNAME_USUARIO = json.username;
                sessionStorage.FOTO_USUARIO = json.imgPerfil;

                setTimeout(function () {
                    window.location = "./feed/feed.html";
                }, 1000); // apenas para exibir o loading

            });


        } else {
            input_username.style.border = bordaVermelha;
            input_senha.style.border = bordaVermelha;

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function listarUsuario() {
    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/listarID/${idUsuario}`).then(function (resposta) {
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

                    var usuario = resposta[0];

                    input_nome.value = usuario.nome;
                    input_username.value = usuario.username;
                    input_email.value = usuario.email;
                    input_senha.value = usuario.senha;
                    
                    // input_foto.value = usuario.
                    // imagemPerfil.innerHTML = `
                    //     <img id="preview" src="../assets/publicacao/${usuario.imgPerfil}" alt="Prévia da Imagem" class="imgPrevia">
                    // `;

                    
                    sessionStorage.FOTO_USUARIO = usuario.imgPerfil 
                });
            }
        } else {
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        console.error(resposta);
    });
}

function atualizar() {
    const foto = document.getElementById('foto');
    var nomeVar = input_nome.value;
    var usernameVar = input_username.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    const formData = new FormData();
    formData.append('foto', foto.files[0]);
    formData.append('nome', nomeVar);
    formData.append('username', usernameVar);
    formData.append('email', emailVar);
    formData.append('senha', senhaVar);

    var idUsuario = sessionStorage.ID_USUARIO;


    fetch(`/usuarios/atualizar/${idUsuario}`, {
        method: "PUT",
        body: formData,
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Atualização realizado com sucesso! Redirecionando para tela anterior...");

            btnAvancar.innerHTML = '<img src="../assets/componentes/loading.gif" height="70%">';
            listarUsuario();

            setTimeout(() => {
                window.location = 'perfil.html';
            }, "1000");

        } else {
            throw "Houve um erro ao tentar realizar a atualização!";
        }
    })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}
