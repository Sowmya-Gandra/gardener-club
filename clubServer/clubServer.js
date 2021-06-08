const express = require('express')
const path = require('path');
const Bundler = require('parcel-bundler');
const bodyParser = require('body-parser');
const session = require('express-session');
const Datastore  = require('nedb-promises')
var AJV = require('ajv');
const bcrypt = require('bcryptjs');


// const memberSchema = require('./memberDataSchema.json');
const activitySchema = require('./activitySchema.json');
// const applicantSchema = require('./applicantDataSchema.json');


const cookieName = "tx7673Clubsam";
const app = express();
const port = 3053;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/activities.db', autoload: true});
const memberDB = new DataStore({filename: __dirname + '/members.db', autoload: true});
const schema = require('./applicantSchema.json');
let users = require('./clubUsersHash.json');
// const Ajv = require('ajv');
// let ajv = new Ajv();

// let validate = ajv.compile(schema);

app.locals.globalMembers = [];

app.use(express.json({ limit: '0.5kb' }));

app.use(session({
  secret: 'club site november 2020',
  resave: false,
  saveUninitialized: false,
  name: cookieName
  }));
  app.use(function (req, res, next) {
  console.log(`session object: ${JSON.stringify(req.session.user)}`);
  console.log(`session id: ${req.session.id}`);
  if (!req.session.user) {
  req.session.user = {role: "guest"};
  }
  next();
  });

  app.use(express.static("public"));
  function checkCustomerMiddleware(req, res, next) {
    if (req.session.user.role === "guest") {
      res.status(403).json({error: "Forbidden"});;
    } else {
  		console.log(`\nSession info: ${JSON.stringify(req.session)} \n`);
      next();
    }
  };

  function checkAdminMiddleware(req, res, next) {
    if (req.session.user.role !== "admin") {
      res.status(403).json({error: "Forbidden"});;
    } else {
      next();
    }
  };

  function jsonErrors(err, req, res, next) {
    res.sendStatus(413);
  console.log('JSON err: ' + err);
    return;
}
// app.get('/', (req, res) => {
//   res.send('Hello World!')
// });


app.get('/info', (req, res) => {
   let a =  {"clubName": "Fremont Gardening Club",
 "ownerName": "Sowmya Puchakayala",
 "ownerNetId": "tx7673"} 
    res.json(a)
  });

  app.get('/activities', (req, res) =>  {

    db.find({}, function(err, docs) {
      if (err) {
        res.json({"error":"something is wrong"});
      } else {
          res.json(docs);
      }
  });
  });

app.post('/activities',checkAdminMiddleware,express.json(), (req, res) => { 
  var ajv = new AJV();
    let valid = ajv.validate(activitySchema, req.body);
    if (valid) {
      db.insert(req.body, function (err, docs) {
        if (err) {
          console.log('Err 404: ' + err.message);
          res.sendStatus(404);
        } else {
          console.log('We found ' + docs.length + ' documents');
          console.log(docs);
          res.send(docs);
        }
      });
    } else {
      console.log(ajv.errors);
      res.sendStatus(422);
    }
}, jsonErrors);



app.delete('/activity',checkAdminMiddleware,express.json(), (req, res) =>  {


  let activities = []

  let idx = JSON.parse(JSON.stringify(req.body)).idx;
  db.remove({ _id: idx }, function (err, numRemoved) {
    if (err) {
      console.log('something is wrong');
      res.sendStatus(404).statusMessage('Data not added');
    } else {
      console.log('removed ' + numRemoved);
      res.sendStatus(200);
    }
  });
}, jsonErrors);


app.get('/member/all', (req, res) =>  {

  memberDB.find({}, function(err, docs) {
    if (err) {
      res.json({"error":"something is wrong"});
    } else {
        res.json(docs);
    }
});

});

app.post('/member',checkCustomerMiddleware,express.json(), (req, res) =>  {

  let body = JSON.parse(JSON.stringify(req.body));
  
   let keys =  ["firstName",
    "lastName",
    "email",
    "password",
    "role"
];


  if(!body)  return res.status(500).json({"status": "no body provided!"})
  if(!Object.keys(body).every( a => keys.indexOf(a)!=-1)) return res.status(500).json({"status": "Invalid Schema"});
  req.app.locals.globalMembers.push(body);
  memberDB.insert(body, function (err, newDoc) {  
    res.json(newDoc);
  });

},jsonErrors);



app.delete('/member',checkCustomerMiddleware,express.json(), (req, res) =>  {
  let idx = JSON.parse(JSON.stringify(req.body)).idx;
  if(!idx && idx!=0)  return res.status(500).json({"status": "no index provided!"})

  try{
    if(!parseInt(idx)) throw Error("Not a number ")

  }catch(e){
    return res.status(500).json(JSON.stringify(e));
  }

   db.remove({ _id: idx }, {}, function (err, numRemoved) {

    res.json({"status": "removed "+numRemoved+" documents" });
  });
   res.json(app.locals.globalMembers);
});

app.get('/login',(req, res) => {
  res.send('Want to join with us!')
});

app.post('/login', express.json(), function (req, res) {
  console.log(req.body);
  let email = req.body.email;
  let password = req.body.password;

  let auser = users.find(function (user) {
  return user.email === email
  });
  console.log("AUSER: "+auser.email);
  if (!auser) { 
  res.status(401).json({
  error: true,
  message: "User/Password error"
  });
  return;
  }
  let verified = bcrypt.compareSync(password, auser.password);
  if (verified) {
  let newUserInfo = Object.assign({}, auser);
  delete newUserInfo.passHash;
  let oldInfo = req.session.user;
  req.session.regenerate(function (err) {
  if (err) {
  console.log(err);
  }
  req.session.user = Object.assign(oldInfo, newUserInfo);
  res.json(newUserInfo);
  });
  } else {
  res.status(401).json({
  error: true,
  message: "User/Password error"
  });
  }
  });

  app.get('/logout',function (req, res) {
    let options = req.session.cookie;
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        
        res.clearCookie(cookieName, options ); // the cookie name and options
        res.json({message: "Goodbye"});
    })
});

app.get('/applicants',(req,res) => {
  res.send('Want to join with us!')
});
app.post('/applicants', express.json(), function(req, res) {
  let applicant = req.body;
  let valid = validate(applicant);
  if (!valid) {
  console.log(validate.errors);
  res.json({error: true, message: validate.errors});
  } else {
  res.json({message: "received your application"});
  }
  }, jsonErrors);

app.listen(port,() => {
  console.log(`clubServer.js app listening at http://localhost:${port}`)
})

