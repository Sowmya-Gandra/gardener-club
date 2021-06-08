const fetch = require('node-fetch');


//  test get all members
fetch('http://localhost:3053/member/all', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));

//  test add a member 

const testBody = {
    "firstName": "Sowmya",
    "lastName": "P",
    "email": "Sowmya.p@yahoo.com",
    "password": "$2a$12$jL.EZPbKxuzwz7boMXcOE.BgPILO.Pvmj1MM6D25cjzSh6XReX2Ty",
    "role": "member"
  };

fetch('http://localhost:3053/member', {
    method: 'POST',
    body:    JSON.stringify(testBody),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));


    // delete  member
    const testDeleteBody = { "idx": 40 };
    fetch('http://localhost:3053/member ', {
        method: 'DELETE',
        body:    JSON.stringify(testDeleteBody),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => console.log(json));
