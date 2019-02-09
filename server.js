const http = require('http');
const app = require('./serverSrc/app.js');

const port = 8000;

const server = http.createServer(app);
server.listen(port, ()=> console.log('listening on', port));