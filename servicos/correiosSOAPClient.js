let soap = require('soap');

function CorreiosSOAPClient() {    
}

CorreiosSOAPClient.prototype.calculaPrazo = (args, callback) => {
    soap.createClient('http://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx?WSDL', (erro, cliente) => {
        if(erro) {
            console.log(erro);
        }else {
            console.log('cliente soap criado');
            cliente.CalcPrazo(args, callback);
        }
    });
}

module.exports = () => CorreiosSOAPClient;