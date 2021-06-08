const session = require('express-session');
const cookieName = "tx7673Clubsam";
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