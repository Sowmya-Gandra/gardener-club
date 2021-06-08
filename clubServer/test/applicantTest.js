const rp = require('request-promise-native');
let baseURL = 'http://127.0.0.11:3053';
let goodApp1 = require('./applicant1.json');
let badApp3 = require('./largeApplicant.json');
let badApp1 = require('./badApplicant1.json');
let badApp2 = require('./badApplicant2.json');
let goodApply1 = {
uri: baseURL + '/applicants',
json: true,
method: "POST",
body: goodApp1
};
let  badApp3 = {
uri: baseURL + '/applicants',
json: true,
method: "POST",
body: largeApp2
};
let badApply1 = {
uri: baseURL + '/applicants',
json: true,
method: "POST",
body: badApp1
};
let badApply2 = {
uri: baseURL + '/applicants',
json: true,
method: "POST",
body: badApp2
};
async function someTests() {
let res;
console.log('Applicant Test 1: Good #1');
try {
res = await rp(goodApply1);
console.log(`Application result: ${JSON.stringify(res)}`);
} catch (error) {
console.log(`Application error: ${error}\n`);
}
console.log('Applicant Test 2: Large #2');
try {
res = await rp( badApp3);
console.log(`Application result: ${JSON.stringify(res)}`);
} catch (error) {
console.log(`Application error: ${error}\n`);
}
console.log('Applicant Test 3: Bad #1');
try {
res = await rp(badApply1);
console.log(`Application result: ${JSON.stringify(res)}`);
} catch (error) {
console.log(`Application error: ${error}\n`);
}
console.log('Applicant Test 3: Bad #2');
try {
res = await rp(badApply2);
console.log(`Application result: ${JSON.stringify(res)}`);
} catch (error) {
console.log(`Application error: ${error}\n`);
}
}
someTests();