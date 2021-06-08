const fetch = require('node-fetch');
const testBody = { "idx": 1 };
const badIdxBody = { "idx": 24 };

//all activites
fetch('http://localhost:3053/activities ', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));



    // delete 
    fetch('http://localhost:3053/activity ', {
        method: 'DELETE',
        body:    JSON.stringify(testBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));


    // bad index 

    fetch('http://localhost:3053/activity ', {
        method: 'DELETE',
        body:    JSON.stringify(badIdxBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
