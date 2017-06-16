const express = require('express');
const useragent = require('useragent');
const systeminfo = require('systeminformation');
const path = require('path');

const app = express();
var ip = '';


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Magic happening on port " + port);
});

app.get('/', (req, res) => {
    var fileName = path.join(__dirname, 'index.html');
    res.sendFile(fileName, (err) => {
        if (err) {
            console.log(err);
            res.status(err.status).end();
        } else {
            console.log('Success!');
        }
    });
});

systeminfo.networkInterfaces(data => {
    ip = data[1].ip4;
});


app.get('/whoami', (req, res) => {
    const agent = useragent.parse(req.headers['user-agent']);
    const lang = req.acceptsLanguages()[0];
    res.json({
        ip: ip,
        language: lang,
        os: agent.os.toString()
    })
});