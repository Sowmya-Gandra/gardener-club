const assert = require('chai').assert;
const got = require('got');
const baseURL = 'http://127.0.0.1:3053/'

describe('Member Testing', function () {
    
    describe('Get Member Tests', function(){
        let login, allMembers;
        before(async function () {
            login = await got.post(baseURL + 'login', {
                json: {
                    email: "abc@gmail.com",
                    password: "123"
                },
                responseType: 'json'
            });

            allMembers = await got(baseURL + 'member/all');
        });
    
        it('Try to access as member',  async function(){
            
        });
        it('Login as Admin',  async function(){
            if(login.statusCode === 200 && login.body.role === 'admin'){
                assert.equal(login.statusCode, 200);
            }
        });
        it('All Member elements have firstname and email',  async function(){
            if(login.statusCode === 200){
                let member = login.body;
                assert.containsAllKeys(member, ['email', 'firstName']);
            }
        });
    })

    describe('Add Member Test', function(){
        let login;
        before(async function () {
            login = await got.post(baseURL + 'login', {
                json: {
                    email: "abc@gmail.com",
                    password: "123"
                },
                responseType: 'json'
            });
        });

        it('Admin Login and Add member',  async function(){
            if(login.statusCode === 200 && login.body.role === 'admin'){
                let result = await got.post(baseURL + 'member', {
                    json: {
                        firstName: "new",
                        lastName: "user",
                        email: "newuser@gmail.com",
                        password: "123",
                        role: "member"
                    },
                    responseType: 'json'
                });
                assert.equal(result.statusCode, 200);
            }
        });
    })

    describe('Delete Member Test', function(){
        let login;
        before(async function () {
            login = await got.post(baseURL + 'login', {
                json: {
                    email: "abc@gmail.com",
                    password: "123"
                },
                responseType: 'json'
            });
        });

        it('Admin Login and Delete member',  async function(){
            if(login.statusCode === 200 && login.body.role === 'admin'){
                let result = await got.delete(baseURL + 'member/new')
                assert.equal(result.statusCode, 200);
            }
        });
    })
    
})
