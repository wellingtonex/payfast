npm install express --save
npm install consign --save
npm install body-parser --save
npm install mysql --save
npm install express-validator --save
npm install restify --save
npm install soap --save
npm install memcached --save
npm install winston --save
npm install morgan --save


curl -X POST http://localhost:3000/upload/imagem  --data-binary @carol.jpg -H "Content-Type: application/octet-stream" -v -H "filename: carol.jpg"

curl http://localhost:3000/pagamentos/pagamento -X POST -v -H "Content-type: application/json" -d @files/pagamento.json | json_pp


CREATE TABLE `pagamentos` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
  `forma_de_pagamento` varchar(255) NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `moeda` varchar(3) NOT NULL,
  `status` varchar(255) NOT NULL,
  `data` DATE,
  `descricao` text,
   PRIMARY KEY (id)
  );

100 Continue: o servidor recebeu a solicitação e o cliente pode continuar a comunicação.
200 Ok: tudo ocorreu como esperado.
201 Created: um novo recurso foi criado no servidor.
301 Moved: a url solicitada foi movida.
400 Bad Request: problemas na requisição do cliente.
404 Not Found: a url solicitada não foi encontrada.
500 Internal Server Error: algo inesperado aconteceu do lado do servidor


https://www.howtoinstall.co/pt/ubuntu/xenial/memcached