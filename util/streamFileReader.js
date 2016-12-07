var fs = require('fs');

fs.createReadStream('carol.jpg')
    .pipe(fs.createWriteStream('imagemStream.jpg'))
    .on('finish', () => {
        console.log('Arquivo escrito com stream.');
    });