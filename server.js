const jsonFileName = 'savingList.json';

const express = require('express');
const fs = require('fs');
const app = express();

bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    // Allow Request from the front-office
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    // List of allowed Methods
    res.header('Access-Control-Allow-Methods', ['GET', 'PUT', 'POST']);
    res.header('Access-Control-Allow-Headers', ['Content-Type']);

    next();
});

app.get('/savingList', (req, res, next) => {
    fs.readFile(jsonFileName, 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.error('can\'t acess to ' + jsonFileName + 'file');
            res.status(500);
        } else {
            console.info('accessing to ' + jsonFileName + ' file');
            res.status(200).json(JSON.parse(data));
        }
    });

});

app.put('/savingList', (req, res, next) => {
    fs.writeFile(jsonFileName, JSON.stringify(req.body), 'utf8', function readFileCallback(err, data) {
        if(err){
            console.error('can\'t write ' + jsonFileName + 'file');
            res.status(500);
        }else{
            console.info('writing ' + jsonFileName + ' file');
            res.status(200).json(req.body);
        }
    });

});

const server = app.listen(8080, () => {
    console.log("Server running on port %s", server.address().port)
});
