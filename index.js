 const http = require('http');



 const host = 'localhost';
 const port = 8000; 


 const expectedToken = 'Bearer ekV5Rk4wMlgvYVpCbmp5WUh5bHVPMktwMzktY05QeDRjT3FlWlNiUTJhbVpraHc5d3Y5a3YtU2pM';

 const server = http.createServer((req, res) => {
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader === expectedToken) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Authorization successful! Welcome to the server.');
    } else {
        res.writeHead(401, { 'Content-Type': 'text/plain' });
        res.end('Unauthorized: Invalid or missing Authorization header.');
    }
 });

 server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
 });


