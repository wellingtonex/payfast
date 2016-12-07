let fs = require('fs');

module.exports = function(app) {
    app.post("/upload/imagem", (req, res) => {

        var arquivo = req.headers.filename;
        console.log('arquivo recebido: ' + arquivo);

        req.pipe(fs.createWriteStream("files/" + arquivo))

        .on('finish', () => {
                console.log('arquivo escrito');
                res.status(201).send('ok');
        });
    });
}