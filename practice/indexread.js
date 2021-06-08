const fs = require('fs'); // Import file system module
let fname = __dirname + '/index1.html';
let fdata = fs.readFileSync(fname, 'utf8');
let lines = fdata.split("\n");
console.log(`The number of lines in the file is: ${lines.length}.`);