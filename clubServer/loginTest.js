const fetch = require('node-fetch');


const goodEmail ={
    "email": "antonin2059@yahoo.com",
    "password": "$2a$12$jL.EZPbKxuzwz7boMXcOE.BgPILO.Pvmj1MM6D25cjzSh6XReX2Ty",
  };

fetch('http://localhost:3053/login', {
    method: 'POST',
    body:    JSON.stringify(goodEmail),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));


const badEmail = {
    "email": "bademail@yahoo.com",
    "password": "$2a$12$jL.EZPbKxuzwz7boMXcOE.BgPILO.Pvmj1MM6D25cjzSh6XReX2Ty",
  };

fetch('http://localhost:3053/login', {
    method: 'POST',
    body:    JSON.stringify(badEmail),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));


const goodEmailIncorrectPassowrd = {
    "email": "antonin2059@yahoo.com",
    "password": "badpassword",
  };

fetch('http://localhost:3053/login', {
    method: 'POST',
    body:    JSON.stringify(goodEmailIncorrectPassowrd),
    headers: { 'Content-Type': 'application/json' },
})
.then(res => res.json())
.then(json => console.log(json));