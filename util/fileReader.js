var fs = require('fs');

fs.readFile('carol.jpg', (error, buffer) => {
    console.log('Lendo arquivo...');
    fs.writeFile('imagem.jpg', buffer, (error) => {
        console.log('Arquivo escrito.');
    });
});
console.log('terminou...');
