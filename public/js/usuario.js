var senha_valida = false;
var username_valido = false;
var email_valido = false;

function validarUsername() {
    usernameVar = input_username.value;

    fetch(`/usuarios/listarUsername/${usernameVar}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                username_valido = true;
            } else {
                username_valido = false;
            }
        } else {
            throw ('Houve um erro na API!');
        }
    });
}

function validarEmail() {
    emailVar = input_email.value;

    fetch(`/usuarios/listarEmail/${emailVar}`).then(function (resposta) {
        if (resposta.ok) {
            if (resposta.status == 204) {
                email_valido = true;
            } else {
                email_valido = false;
            }
        } else {
            throw ('Houve um erro na API!');
        }
    });
}

function validarSenha() {
    senhaVar = input_senha.value;

    cardSenha.style.display = 'flex';

    var senha_especial = false;
    var senha_tamanho = false;
    var senha_temNumero = false;
    var senha_minu = false;
    var senha_maiu = false;

    var senha_excla = senhaVar.includes('!');
    var senha_arroba = senhaVar.includes('@');
    var senha_hash = senhaVar.includes('#');
    var senha_sif = senhaVar.includes('$');
    var senha_porc = senhaVar.includes('%');
    var senha_comer = senhaVar.includes('&');

    if (senhaVar.length > 7) {
        senha_tamanho = true;
        span_tamanho.style.color = 'green';
    } else {
        senha_tamanho = false;
        span_tamanho.style.color = 'red';
    }

    if (senhaVar != '' && (senha_excla || senha_arroba || senha_hash || senha_sif || senha_porc || senha_comer)) {
        senha_especial = true;
        span_especial.style.color = 'green';
    } else {
        senha_especial = false;
        span_especial.style.color = 'red';
    }

    for (var num = 0; num < 10; num++) {
        senha_numero = senhaVar.includes(num);

        if (senha_numero) {
            break
        }
    }

    if (senhaVar != '' && senha_numero) {
        senha_temNumero = true;
        span_numero.style.color = 'green';
    } else {
        senha_temNumero = false;
        span_numero.style.color = 'red';
    }

    var senha_minusculo = senhaVar.toLowerCase();
    var senha_maiusculo = senhaVar.toUpperCase();

    if (senhaVar != senha_maiusculo) {
        senha_minu = true;
        span_minuscula.style.color = 'green';
    } else {
        senha_minu = false;
        span_minuscula.style.color = 'red';
    }

    if (senhaVar != senha_minusculo) {
        senha_maiu = true;
        span_maiuscula.style.color = 'green';
    } else {
        senha_maiu = false;
        span_maiuscula.style.color = 'red';
    }

    if (senha_especial && senha_temNumero && senha_numero && senha_maiu && senha_minu) {
        senha_valida = true;
    } else {
        senha_valida = false;
    }
}

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

    if (nomeVar == '') {
        input_nome.style.border = bordaVermelha;
        alerta(`Preencha o nome corretamente!`, 'erro');
    } else {
        input_nome.style.border = bordaVerde;
    }

    if (emailVar == '') {
        input_email.style.border = bordaVermelha;
        alerta(`Preencha o email corretamente!`, 'erro');
    } else {
        input_email.style.border = bordaVerde;
    }

    if (senhaVar == '') {
        input_senha.style.border = bordaVermelha;
        alerta(`Preencha a senha corretamente!`, 'erro');
    } else if (senha_valida) {
        input_senha.style.border = bordaVerde;
    }

    if (!username_valido) {
        input_username.style.border = bordaVermelha;
        alerta(`Username em uso!`, 'erro');
    } else if(username_valido) {
        input_username.style.border = bordaVerde;
    }

    if (!email_valido) {
        input_email.style.border = bordaVermelha;
        alerta(`Email em uso!`, 'erro');
        return false;
    } else if(email_valido) {
        input_email.style.border = bordaVerde;
    }

    if (
        nomeVar == "" ||
        emailVar == "" ||
        usernameVar == "" ||
        senhaVar == ""
    ) {
        alerta(`Preencha os campos!`, 'erro');
        return false;
    } else if (!emailArroba) {
        input_email.style.border = bordaVermelha;
        alerta(`Email inválido!`, 'erro');
        return false;
    } else if (tamNome <= 0) {
        input_nome.style.border = bordaVermelha;
        return false;
    } else if (tamUsername <= 0 || !username_valido) {
        input_username.style.border = bordaVermelha;
        return false;
    } else if (!senha_valida) {
        input_senha.style.border = bordaVermelha;
        alerta(`Senha não segue as regras!`, 'erro');
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
            // console.log("resposta: ", resposta);

            if (resposta.ok) {
                input_email.style.border = bordaVerde;
                input_nome.style.border = bordaVerde;
                input_username.style.border = bordaVerde;
                input_senha.style.border = bordaVerde;

                // console.log("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                alerta(`Cadastrado com sucesso!`, 'sucesso');

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");


            } else {
                alerta(`Houve um erro ao tentar cadastrar!`, 'erro');
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            alerta(`${resposta}: Houve um erro interno ao cadastrar`, 'erro');
            console.log(`#ERRO: ${resposta}`);

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
        alerta(`Preencha o username e a senha!`, 'erro');
        return false;
    }

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
            alerta(`Username ou senha inválidos!`, 'erro');
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        alerta(`${erro}: Erro interno ao realizar login!`, 'erro');
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
                    // input_username.value = usuario.username;
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
            alerta(`Houve um erro ao listar usuário!`, 'erro');
            throw ('Houve um erro na API!');
        }
    }).catch(function (resposta) {
        alerta(`${resposta}: Erro interno ao listar usuário!`, 'erro');
        console.error(resposta);
    });
}

function atualizar() {
    var nomeVar = input_nome.value;
    // var usernameVar = input_username.value;
    var emailVar = input_email.value;
    var senhaVar = input_senha.value;

    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/atualizar/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            console.log("Atualização realizado com sucesso! Redirecionando para tela anterior...");

            btnAvancar.innerHTML = '<img src="../assets/componentes/loading.gif" height="70%">';
            listarUsuario();
            alerta(`Informações atualizadas com sucesso!`, 'sucesso');
            setTimeout(() => {
                window.location = 'perfil.html';
            }, "1000");

        } else {
            alerta(`Houve um erro ao tentar atualizar informações!`, 'erro');
            throw "Houve um erro ao tentar realizar a atualização!";
        }
    })
        .catch(function (resposta) {
            alerta(`${resposta}: Houve um erro interno ao atualizar informações!`, 'erro');
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function atualizarFoto() {
    console.log(foto)
    const formData = new FormData();
    formData.append('foto', foto.files[0]);

    var idUsuario = sessionStorage.ID_USUARIO;

    fetch(`/usuarios/atualizarFoto/${idUsuario}`, {
        method: "PUT",
        body: formData,
    }).then(function (resposta) {
        // console.log("resposta: ", resposta);

        if (resposta.ok) {
            // console.log("Atualização realizado com sucesso! Redirecionando para tela anterior...");
            alerta(`Foto de perfil atualizada!`, 'sucesso');
        } else {
            alerta(`Houve um erro ao tentar atualizar imagem de perfil!`, 'erro');
            throw "Houve um erro ao tentar realizar a atualização!";
        }
    })
        .catch(function (resposta) {
            alerta(`${resposta}: Houve um erro interno ao atualizar imagem de perfil!`, 'erro');
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}
