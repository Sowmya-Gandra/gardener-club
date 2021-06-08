const express = require('express')
const app = express()
const port = 1357
var visits =0 ;


app.get('/date', (req, res) => {
  res.send('Name: Sowmya, Date and time ' + new Date().toString());
})


app.get('/netid', (req, res) => {
  visits +=1;
  res.send('Name: Sowmya <br/> Net ID: tx7673 <br/>  No of Visits: ' + visits);
})
 

app.listen(port, () => {
  console.log(`Netid app listening at http://localhost:${port}`)
})
