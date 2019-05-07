const http = require('http');

const app = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.write("URL /f");
    res.end();
});

app.listen(8002);
console.log(`listening 8002`);