const { Transform } = require('stream');

class CustomStream extends Transform {
    _transform(chunk, encoding, callback) {
        const input = chunk.toString();
        const transformed = Array.from(input, (char) => {
            if (/[a-zà-ÿ¸³¿]/i.test(char) && Number.isNaN(Number(char))) {
                return char.toUpperCase();
            }
            return char;
        }).join('');
        console.log(transformed);
        callback(null); 
    }
}

const customStream = new CustomStream();
process.stdin.pipe(customStream);
