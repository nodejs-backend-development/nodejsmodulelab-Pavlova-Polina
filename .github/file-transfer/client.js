const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const filePath = path.join(__dirname, 'input_file.txt');

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'This is a test file for compression and transfer.');
}

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/upload',
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip',
    },
};

const req = http.request(options, (res) => {
    let data = '';
    res.on('data', () => {
        data += '';
    });
    res.on('end', () => {
        console.log('Response from server:', data);
    });
});

req.on('error', () => {
    console.error('Error sending request');
});

const readStream = fs.createReadStream(filePath);
const gzip = zlib.createGzip();
readStream.pipe(gzip).pipe(req);