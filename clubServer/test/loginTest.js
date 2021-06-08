const assert = require('chai').assert;
const fetch = require('node-fetch');
const getCookies = require('./getCookies.js');
const urlBase = 'http://localhost:3053/login';

describe('Login Tests', function () {
    let res;
    let tours = null;
    let myCookie = null;

    before(async function () {
        console.log("Calling fetch");
        res = await fetch(urlBase + 'info');
        console.log("Back from fetch");
        myCookie = getCookies(res);
    })
    it('Cookie with appropriate name is returned', function () {
        assert.include(myCookie, 'tx7673Clubsam');
    });
    describe('Login Sequence', function () {
        before(async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "stedhorses1903@yahoo.com",
                    "password": "nMQs)5Vi"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
        });
        it('Login Good', function () {
            assert.equal(res.status, 200);
        });
        it('User returned', async function () {
            let user = await res.json();
            assert.containsAllKeys(user, ['firstName', 'lastName', 'role']);
        });
        it('Cookie session ID changed', function () {
            let cookie = getCookies(res);
            assert.notEmpty(cookie);
            assert.notEqual(cookie, myCookie);
            console.log(cookie, myCookie);
        });

        it('Logout,cookie cleared',async function() {
            res = await fetch(urlBase + 'logout');
            console.log("Logout, cookie cleared");
        });
    });
    describe('Bad Logins', function () {
        it('Bad Email', async function () {
            res = await fetch(urlBase + 'login', {
                method: "post",
                body: JSON.stringify({
                    "email": "Bstedhorses1903@yahoo.com",
                    "password": "nMQs)5Vi"
                }),
                headers: {
                    "Content-Type": "application/json",
                    cookie: myCookie
                },
            });
            assert.equal(res.status, 401);
        });
        it('Bad Password', async function () {
            before(async function () {
                res = await fetch(urlBase + 'login', {
                    method: "post",
                    body: JSON.stringify({
                        "email": "stedhorses1903@yahoo.com",
                        "password": "BnMQs)5Vi"
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        cookie: myCookie
                    },
                });
                assert.equal(res.status, 401);
            });
        });
    });
});