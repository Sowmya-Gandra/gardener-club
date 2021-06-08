const { expect } = require('chai');
const fetch = require('node-fetch');
const getCookies = require('./getCookies');
const assert = require('chai').assert;
const urlBase = 'http://localhost:3053';
let dummyData = {"name":"Fruitful Friday","dates":["September 18"]};
  
  let dummyBigData = {"name":"Fruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful FridayFruitful Friday","dates":["September 18","October 2","October 16","October 30","November 13","November 27","December 11","December 25"]};
  
  let dummyMissingData ={"name":"","dates":["September 18"]};
  

describe('Activity Testing', function () {
    let res;
    let body;
    let cookies;
    before(async function () {
      res = await fetch(urlBase + '/activities');
      body = await res.json();
      fetch(urlBase + '/info').then((res) => (cookies = getCookies(res)));
    });
  
    describe('Get Activity Tests', function () {
      it('Everything is OK', function () {
        assert.equal(res.status, 200);
      });
      it('Returns an array', function () {
        assert.isArray(body);
      });
      it('All Activity elements have _id, dates and names', function () {
        body.forEach((element) => {
          expect(element).to.deep.keys(
            '_id',
            'dates',
            // 'date',
            'name'
          );
        });
      });
    });
  
    describe('Add Activity Tests', function () {
      it('Try add activity w/o logging in', function () {
        fetch(urlBase + '/activities', {
          method: 'post',
          body: JSON.stringify(dummyData),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          assert.equal(res.status, 404);
        });
      });
  
      describe('Login and Add activity', function () {
        let dummyCorrectLoginData = {
          email: 'tirrivees1820@outlook.com',
          password: '49OqspUq',
        };
  
        it('Add good activity', function (done) {
            this.timeout(10000);
          fetch(urlBase + '/login', {
            method: 'post',
            body: JSON.stringify(dummyCorrectLoginData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          }).then((res) => {
            cookies = getCookies(res);
            fetch(urlBase + '/activities', {
              method: 'post',
              body: JSON.stringify(dummyData),
              headers: {
                'Content-Type': 'application/json',
                cookie: cookies,
              },
            })
              .then((r) => {
                assert.equal(r.status, 200);
                done();
              })
              .catch(done);
          }).catch(done);
        });
  
        it('Add too big activity', function (done) {
            this.timeout(10000);
          fetch(urlBase + '/login', {
            method: 'post',
            body: JSON.stringify(dummyCorrectLoginData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          }).then((res) => {
            cookies = getCookies(res);
            fetch(urlBase + '/activities', {
              method: 'post',
              body: JSON.stringify(dummyBigData),
              headers: {
                'Content-Type': 'application/json',
                cookie: cookies,
              },
            })
              .then((r) => {
                assert.equal(r.status, 413);
                done();
              })
              .catch(done);
          });
        });
  
        it('Add missing stuff activity', function () {
          fetch(urlBase + '/login', {
            method: 'post',
            body: JSON.stringify(dummyCorrectLoginData),
            headers: {
              'Content-Type': 'application/json',
              cookie: cookies,
            },
          }).then((res) => {
            cookies = getCookies(res);
            fetch(urlBase + '/activities', {
              method: 'post',
              body: JSON.stringify(dummyMissingData),
              headers: {
                'Content-Type': 'application/json',
                cookie: cookies,
              },
            })
              .then((r) => {
                assert.equal(r.status, 422);
                done();
              })
              .catch(done);
          });
        });
      });
    });
  
    describe('Delete Activity Tests', function () {
      let dummyCorrectData ={ idx:'iNw9RWAtLoGjYGDY'};
      let dummyWrongData ={ idx: '100'};
  
      it('Try delete w/o logging in', function () {
        fetch(
          urlBase + '/activity',
          {
            method: 'delete',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dummyCorrectData)
          }
        ).then((res) => assert.equal(res.status, 401));
      });
      it('Login and Delete activity', function () {
        let dummyCorrectLoginData = {
          email: 'tirrivees1820@outlook.com',
          password: '49OqspUq',
        };
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        }).then((res) => {
          if (res.status == 200) {
            fetch(
              urlBase +
                '/activity',
              {
                method: 'delete',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dummyCorrectData)
              }
            ).then((res) => assert.equal(res.status, 200));
          }
        });
      });
      it('Login and Bad Delete activity', function () {
        let dummyCorrectLoginData = {
          email: 'tirrivees1820@outlook.com',
          password: '49OqspUq',
        };
        fetch(urlBase + '/login', {
          method: 'post',
          body: JSON.stringify(dummyCorrectLoginData),
          headers: {
            'Content-Type': 'application/json',
            cookie: cookies,
          },
        }).then((res) => {
          if (res.status == 200) {
            fetch(
              urlBase + '/activity' ,
              {
                method: 'delete',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify( dummyWrongData)
              }
            ).then((res) => assert.equal(res.status, 200));
          }
        });
      });
    });
  });
  
// const rp = require('request-promise-native');
// let baseURL = 'http://127.0.0.11:3053';
// let badApp1 = require('./largeApplicant.json');
// let badApp2 = require('./badApplicant1.json');

// let  badApp1 = {
//     uri: baseURL + '/applicants',
//     json: true,
//     method: "POST",
//     body: largeApp2
//     };
//     let badApp2 = {
//     uri: baseURL + '/applicants',
//     json: true,
//     method: "POST",
//     body: badApp2
//     };

//     async function someTests() {
//         let res;
//         console.log('Large JSON test 2: Large #2');
//         try {
//         res = await rp( badApp1);
//         console.log(`Activity add result: ${JSON.stringify(res)}`);
//         } catch (error) {
//         console.log(`Activity add error: ${error}\n`);
//         }
//         console.log('Missing data test : Bad #1');
//         try {
//         res = await rp(badApp2);
//         console.log(`Activity add result: ${JSON.stringify(res)}`);
//         } catch (error) {
//         console.log(`Activity add error: ${error}\n`);
//         }
//     }
//         someTests();
