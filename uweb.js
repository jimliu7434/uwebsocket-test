const web = require('uWebSockets.js');

const app = web.App();

app.ws({
    compression: 0,
    maxPayloadLength: 16 * 1024 * 1024,
    idleTimeout: 10,
    /* Handlers */
    open: (ws, req) => {
        console.log(`ws connected via ${req.getUrl()}!`);
    },
    message: (ws, message, isBinary) => {
        /* Ok is false if backpressure was built up, wait for drain */
        console.log(`msg ${message}`);
        let ok = ws.send(message, isBinary);
    },
    drain: (ws) => {
        console.log(`ws backpressure: ${ws.getBufferedAmount()}`);
    },
    close: (ws, code, message) => {
        console.log(`ws closed`);
    }
});

app.any('/f', (req, res) => {
    res.end(`URL /f`);
});

app.any('/*', (req, res) => {
    res.end(`URL /`);
});

app.listen(8001, (token) => {
    if (token) {
        console.log(`listening 8001`);
    }
});