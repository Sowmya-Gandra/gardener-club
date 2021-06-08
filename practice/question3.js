const { Resolver } = require('dns').promises;
const resolver = new Resolver();

// let servers = resolver.getServers();
// console.log("DNS Servers:");
// console.log(servers);

resolver.resolve4('twitter.com').then((addresses) => {
    console.log('Address for twitter');
    console.log(addresses);
});

// resolver.resolveAny("www.amazon.com").then(info => {
//   console.log('All the info for amazon:')
//   console.log(info);
// });


