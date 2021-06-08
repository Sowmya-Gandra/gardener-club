
const fetch = require('node-fetch');
const testBody = { "name": "test", "date": "12/12/2020" };

Promise.all([
	fetch('http://10.0.0.32:3053/info'),
	fetch('http://10.0.0.32:3053/activities')
]).then(function (responses) {
	// Get a JSON object from each of the responses
	return Promise.all(responses.map(function (response) {
		return response.json();
	}));
}).then(function (data) {
    console.log('\x1b[33m%s\x1b[0m',"\n Club Information:\n");
    console.log(data[0]);
    console.log('\x1b[33m%s\x1b[0m',"\n Club Activities: \n");
    console.log(data[1]);
})
