const fetch = require('node-fetch');
let site1 = {
    url:"https://jntuh.ac.in/",
    options: {method: "HEAD"}
  };
  
  let site2 = {
    url: "https://www.facebook.com/",
    options: {method: "HEAD"}
  };
  
  let site3 = {
    url: "https://www.upsc.gov.in/",
    options: {method: "HEAD"}
  };
  
  let start = new Date();
  fetch (site1.url, site1.options)
    .then(res => {
      // console.log(`Grotto status: ${JSON.stringify(res)}`);
      let time = (new Date() - start) / 1000;
      console.log(`JNTU Hyderabad status: ${res.statusText}, time: ${time}`);
      return fetch(site2.url, site2.options);
    })
    .then(res => {
      let time = (new Date() - start) / 1000;
      console.log(`Facebook status: ${res.statusText}, time: ${time}`);
      return fetch(site3.url, site3.options);
    })
    .then(res => {
      let time = (new Date() - start) / 1000;
      console.log(`UPSC status: ${res.statusText}, time: ${time}`);
    });
  console.log("Starting my web requests:");