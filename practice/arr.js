var arr=[]
var conv= require('./eventdata');
arr.push(conv);
const fs = require('fs'); // File system module
let fname = __dirname + '/eventdata.json';
let fdata = fs.readFileSync(fname, 'utf8');
console.log("Contents of file eventdata.json:");
console.log(fdata);