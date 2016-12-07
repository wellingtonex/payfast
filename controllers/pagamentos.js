module.exports = (app) => {
    app.get('/pagamentos', (req, res) => {
        console.log('Recebida requisição de teste.');
        res.send('ok');
    });

    app.post("/pagamentos/pagamento", (req, res) => {
        let pagamento = req.body.pagamento;
        let cartao = req.body.cartao;

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        console.log('processando pagamento...');

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        req.assert("pagamento.forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
        req.assert("pagamento.valor", "Valor é obrigatório.").notEmpty().isFloat();
        req.assert("pagamento.valor", "Valor deve ser um decimal.").isFloat();
        req.assert("pagamento.moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);

        var errors = req.validationErrors();

        if (errors){
            console.log("Erros de validação encontrados");
            res.status(400).send(errors);
            return;
        }

        pagamentoDao.salva(pagamento, (error, result) => {
            if(error) {
                res.status(500).send(error);
                console.log(error);
            } else {
                
                let response = {
                    cartao: cartao,
                    dados_do_pagamento: pagamento,
                    links: [{
                        href:'http://localhost:3000/pagamentos/pagamento/' +  result.insertId,
                        rel:'confirmar',
                        method:'PUT'
                    },{
                        href:'http://localhost:3000/pagamentos/pagamento/' +  result.insertId,
                        rel:'cancelar',
                        method:'DELETE'
                    }]
                }

                console.log('pagamento criado: ' + result);

                if(pagamento.forma_de_pagamento == 'cartao') {
                    let cartoesClient = new app.servicos.clienteCartoes();
                    cartoesClient.autoriza(cartao, function (errCartao, request, responseCartao, retorno) {
                        if (errCartao){
                            console.log("Erro ao consultar serviço de cartões.");
                            res.status(errCartao.statusCode).send(errCartao);
                            return;
                        }
                        console.log('Retorno do servico de cartoes: %j', retorno);
                        res.location('/pagamentos/pagamento/' + result.insertId);
                        res.status(201).json(response);
                    });
                }else {
                    res.location('/pagamentos/pagamento/' + result.insertId);
                    res.status(201).json(response);
                }

            }
        });
    });

    app.put('/pagamentos/pagamento/:id', (req, res) => {
        let id = req.params.id;
        let pagamento = {};

        pagamento.id = id;
        pagamento.status = 'CONFIRMADO';

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        pagamentoDao.atualiza(pagamento, (erro) => {
            if(erro) {
                res.status(500).send(erro);
                return;
            }
            res.send(pagamento);
        });


    });

    app.delete('/pagamentos/pagamento/:id', (req, res) => {
        let id = req.params.id;
        let pagamento = {};

        pagamento.id = id;
        pagamento.status = 'CANCELADO';

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

         pagamentoDao.atualiza(pagamento, (erro) => {
            if(erro) {
                res.status(500).send(erro);
                return;
            }
            res.status(204).send(pagamento);
        });

    });
}
