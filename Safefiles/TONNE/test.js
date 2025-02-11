const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Node.js Server funktioniert!\n');
});

server.listen(3000, () => {
    console.log('Server läuft auf http://localhost:3000');
});
