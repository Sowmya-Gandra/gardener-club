const rp = require('request-promise-native');
let baseURL = 'http://127.0.0.11:3053';
let badApp1 = require('./largeApplicant.json');
let badApp2 = require('./badApplicant1.json');

let  badApp1 = {
    uri: baseURL + '/applicants',
    json: true,
    method: "POST",
    body: largeApp2
    };
    let badApp2 = {
    uri: baseURL + '/applicants',
    json: true,
    method: "POST",
    body: badApp2
    };

    async function someTests() {
        let res;
        console.log('Large Json data: Large #2');
        try {
        res = await rp( badApp1);
        console.log(`Member add result: ${JSON.stringify(res)}`);
        } catch (error) {
        console.log(`Member add error: ${error}\n`);
        }
        console.log('Missing data: Bad #1');
        try {
        res = await rp(badApp2);
        console.log(`Member add missing data result: ${JSON.stringify(res)}`);
        } catch (error) {
        console.log(`Member add missing data error: ${error}\n`);
        }
    }
        someTests();