// Incluindo a bibliotecas
const http = require('http');
const url = require('url');
const queryString = require('query-string');
const utf8 = require('utf8');

// Definindo o endereço / url (ip e porta)
const hostname = '127.0.0.1'; //localhost
const port = 3000;

// Implementação da regra do negócio
/* Quando a pessoa chegar ao endereço, execute o código abaixo */
const server = http.createServer((req, res) => {

  // Pegar a pergunta na url
  const params = queryString.parse(url.parse(req.url, true).search);
  // console.log(params);

  // Verificar a pergunta e escolher uma resposta
  let resposta;
  if (params.pergunta == 'melhor-filme') {
    resposta = 'Star Wars';
  } else if (params.pergunta == 'melhor-tecnologia-backend') {
    resposta = 'Nodejs';
  } else {
    resposta = 'Não sei =(';
  }

  // Retornar a reposta escolhida


  res.statusCode = 200; // Informa que o carregamento da página deu certo (oposto de erro 404)
  res.setHeader('Content-Type', 'text/plain');
  res.end(resposta); // Saída no navegador
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});