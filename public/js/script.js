function validarCampos() {
    var nome = input_nome.value;
    var username = input_username.value;
    var email = input_email.value;
    var senha = input_senha.value;

    var bordaVerde = 'solid 1px green';
    var bordaVermelha = 'solid 1px red';

    input_username.value = username.replaceAll(' ', '');
    input_email.value = email.replaceAll(' ', '');
    input_senha.value = senha.replaceAll(' ', '');

    var emailArroba = email.includes('@');
    if (emailArroba) {
        input_email.style.border = bordaVerde;
    }

    var tamNome = nome.length;
    if (tamNome > 0) {
        input_nome.style.border = bordaVerde;
    } else {
        input_nome.style.border = bordaVermelha;
    }

    var tamUsername = username.length;
    if (tamUsername > 0 && username != 'moiseshxs') {
        input_username.style.border = bordaVerde;
    } else {
        input_username.style.border = bordaVermelha;
    }

    var tamSenha = senha.length;
    if (tamSenha > 0 && tamSenha < 8) {
        input_senha.style.border = bordaVermelha;
    } else {
        input_senha.style.border = bordaVerde;
    }
}