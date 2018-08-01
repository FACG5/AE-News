const http = require('http');
const router = require('./router');

const port = process.env.PORT || 7000;
const server = http.createServer(router);
server.listen(port);
