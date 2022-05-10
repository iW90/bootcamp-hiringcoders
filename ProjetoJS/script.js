

function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    } else {
        var numeros = cpf.substring(0, 9);
        var digitos = cpf.substring(9);
        /* console.log('Números do CPF ' + numeros); */
        /* console.log('Dígitos do CPF ' + digitos); */

        var soma = 0;
        for(let i = 10; i > 1; i--) {
            soma += numeros.charAt(10 - i) * i; // charAt retorna a posição daquela string na lista
        }
        console.log(soma);

        // Validação do primeiro dígito
        var resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);

        if(resultado != digitos.charAt(0)) {
            return false;
        } 
        /* console.log(digitos.toString().charAt(0) + ' é a primeira posição da variável soma'); */


        // Validação do segundo dígito
        soma = 0;
        numeros = cpf.substring(0, 10);

        for(let j = 11; j > 1; j--) {
            soma += numeros.charAt(11 - j) * j;
        }

        return true;
    }
}

function validacao() {
    var cpf = document.getElementById('cpf_digitado').value;
     /* console.log(cpf); */

    document.getElementById('success').style.display = 'none';
    document.getElementById('error').style.display = 'none';


    var resultadoValidacao = validaCPF(cpf);

    if (resultadoValidacao) {
        document.getElementById('success').style.display = 'block';
    } else {
        document.getElementById('error').style.display = 'block';
    }

}