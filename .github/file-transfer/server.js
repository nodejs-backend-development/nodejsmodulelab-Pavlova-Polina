const http = require('http');
const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// ������� ���� ��� ������ �����
const outputPath = 'C:\\Users\\Admin\\Desktop\\received_file.txt';
// const outputPath = path.join(__dirname, 'received_file.txt');

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/upload') {
        // ��������� ������ ��� ����������� � ������
        const unzip = zlib.createGunzip();
        const writeStream = fs.createWriteStream(outputPath);

        // �������� ��� � ������ ����� ����������� � ����
        req.pipe(unzip).pipe(writeStream);

        // ������� ���������� ������
        writeStream.on('finish', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'File received and unzipped successfully' }));
        });

        // ������� ������� �����������
        unzip.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error unzipping file' }));
        });

        // ������� ������� ������
        writeStream.on('error', (err) => {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Error writing file' }));
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});