
const fetch = require('node-fetch');
const testBody = { "name": "test", "date": "12/12/2020" };

function updateactivites () {
fetch('http://10.0.0.32:3053/activities ', {
        method: 'post',
        body:    JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));

}