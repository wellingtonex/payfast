npm install --save express
npm install --save consign
npm install --save body-parser
npm install --save mysql
npm install --save express-validator


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