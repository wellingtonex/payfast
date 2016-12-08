var memcached = require('memcached');

function createMemcachedClient() {
    return new memcached('localhost:11211', {
        retries: 10,
        retry: 10000,
        remove: true
    });
}

module.exports = () => createMemcachedClient; 


// client.set('pagamento-42', {id:42}, 60000, (error) => {
//     console.log('Nova chave adicionada ao cache');    
// }); 

// client.get('pagamento-42', (error, result) => {
//     if(error | !result) {
//         console.log('MISS - Chave não encontrada.');
//     } else {
//         console.log('HIT - valor: ' + JSON.stringify(result));        
//     }
// });