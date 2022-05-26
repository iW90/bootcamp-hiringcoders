const http = require('http');
const url = require('url');
const queryString = require('query-string');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  let resposta;
  const urlparse = url.parse(req.url, true);

  // Receber informações do usuário
  const params = queryString.parse(urlparse.search);
  // console.log(params);

  // Criar e atualizar um usuário
  if(urlparse.pathname == '/criar-atualizar-usuario') {

    // Salvar as informações
    fs.writeFile('users/' + params.id + '.txt', JSON.stringify(params), function (err) {
      if (err) throw err;
      console.log('Saved!');

      resposta = 'Usuario criado/atualizado com sucesso!';

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  } 
  // Selecionar um usuário
  else if(urlparse.pathname == '/selecionar-usuario') {
    fs.readFile('users/' + params.id + '.txt', function(err, data) {
      
      resposta = data;

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(resposta);
    });
  }

  // Remover um usuário
  else if(urlparse.pathname == '/remover-usuario') {
    fs.unlink('users/' + params.id + '.txt', function (err) {
      console.log('File deleted!');

      resposta = err ? "Usuario nao encontrado." : "Usuario removido.";

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end(resposta);
    });
  }
});

// Execução
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// http://localhost:3000/criar-atualizar-usuario?nome=indy&idade=80&id=1
// http://localhost:3000/criar-atualizar-usuario?nome=indy&idade=30&id=1
// http://localhost:3000/selecionar-usuario?id=1
// http://localhost:3000/remover-usuario?id=1