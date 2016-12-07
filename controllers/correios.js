module.exports = function(app) {

    app.post('/correios/calculo-prazo', (req, res) => {
        let dadosEntrega = req.body;

        var correiosSOAPClient = new app.servicos.correiosSOAPClient();

        correiosSOAPClient.calculaPrazo(dadosEntrega, (error, resultado) => {
            if(error) {
                res.status(500).send(error);
            } else {
                console.log('prazo calculado: %j', resultado);
                res.json(resultado);
            }
        })
    });
}