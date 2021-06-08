const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./clubUsers2.json');
let nRounds = 10;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);

fs.readFile("./clubUsers2.json", (err, data) => {
    if (err) throw err;

    let  parsedData = JSON.parse(data);
    parsedData.map( a =>  {
        a.password = bcrypt.hashSync(a.password);
        hashedUsers.push(a);
    });
    let elapsed = new Date() - start; // timing code
    console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
    fs.writeFileSync("clubUsersHash.json", JSON.stringify(hashedUsers, null, 2));
});

