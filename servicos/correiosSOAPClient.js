let soap = require('soap');

soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?WSDL', (erro, cliente) => {
    if(erro) {
        console.log(erro);
    }else {
        console.log('cliente soap criado');
        cliente.CalcPrazo(
            {'nCdServico': '40010',
             'sCepOrigem':'04101300',
             'sCepDestino':'65000600'}, (error, result) => {
            if(error) {
                console.log(error);
            } else {
                console.log(JSON.stringify(result));
            }
        })
    }
    
});

