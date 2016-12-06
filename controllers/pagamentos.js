module.exports = (app) => {
    app.get('/pagamentos', (req, res) => {
        console.log('Recebida requisição de teste.');
        res.send('ok');
    });

    app.post("/pagamentos/pagamento", (req, res) => {
        let pagamento = req.body;

        pagamento.status = 'CRIADO';
        pagamento.data = new Date();

        console.log('processando pagamento...');

        let connection = app.persistencia.connectionFactory();
        let pagamentoDao = new app.persistencia.PagamentoDao(connection);

        req.assert("forma_de_pagamento", "Forma de pagamento é obrigatória.").notEmpty();
        req.assert("valor", "Valor é obrigatório.").notEmpty().isFloat();
        req.assert("valor", "Valor deve ser um decimal.").isFloat();
        req.assert("moeda", "Moeda é obrigatória e deve ter 3 caracteres").notEmpty().len(3,3);

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
                console.log('pagamento criado: ' + result);
                res.location('/pagamentos/pagamento/' + result.insertId);
                res.status(201).json(pagamento);
            }
        });
    });
}
