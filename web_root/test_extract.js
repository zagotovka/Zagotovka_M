const fs = require('fs');
console.log('Starting...');
const code = fs.readFileSync('main.js', 'utf8');
console.log('File size:', code.length);
