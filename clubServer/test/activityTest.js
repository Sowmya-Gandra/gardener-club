const assert = require('chai').assert;
const getCookies = require('./getCookies.js');
const got = require('got');
const baseURL = 'http://localhost:3053/'

describe('Activity Testing', function(){

    describe('Get activity Tests', function () {
        let res, data;
    
        before(async function(){
            res = await got(baseURL + 'activities');
            data = res.body;
        })
        it('Everything is OK', async function(){
            assert.equal(res.statusCode, 200);
        });
        it('Returns an array', async function(){
            let result = JSON.parse(data)
            assert.isArray(result);
        });
        it('All tour elements have name and date', function(){
            let result = JSON.parse(data)
            result[0].map(item => {
                assert.containsAllKeys(item, ['name', 'date']);
            })
        });
        
    })
    
    describe('Add Activity Tests', function () {
        let login, noLogin, addActivities;
        before(async function () {
            login = await got.post(baseURL + 'login', {
                json: {
                    email: "xyz@gmail.com",
                    password: "986"
                },
                responseType: 'json'
            });
        });
    
        it('Login as a member and add activity', async function(){
            if(login.statusCode === 200 && login.body.role === 'member'){
                addActivities = await got.post(baseURL + 'activities', {
                    json: {
                        name: "Test",
                        date: "1/1/2019"
                    },
                    responseType: 'json'
                });
                assert.equal(addActivities.statusCode, 200);
            }
        });
    
    })
    
    describe('Delete Activity Tests', function () {
        let login, deleteActivities;
    
        before(async function () {
            login = await got.post(baseURL + 'login', {
                json: {
                    email: "abc@gmail.com",
                    password: "123"
                },
            });
        });
    
        it('Login and delete activity', async function(){
            if(login.statusCode === 200){
                deleteActivities = await got.delete(baseURL + 'activity/megha')
                assert.equal(deleteActivities.statusCode, 200);
            }
        });
    
    });
});