const express = require('express');
const request = require('request');

const app = express();
const PORT = 3000;

app.use('/proxy', (req, res) => {
    const url = req.query.url;
    if (!url) {
        res.status(400).send('Missing URL parameter');
        return;
    }

    req.pipe(request(url)).pipe(res);
});

app.listen(PORT, () => {
    console.log(`Proxy server is running on port ${PORT}`);
});