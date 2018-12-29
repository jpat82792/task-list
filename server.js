// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');
const app = express();
const passport = require('./controllers/authenticator-controller.js')(app);
//const router = require('./routes/router.js');
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure engine to use ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Point static path to dist
app.use('/', express.static(path.join(__dirname, 'views')));

//app.use('/', express.static(path.join(__dirname, 'dist/task-list')));
app.use('/api',api);
app.use('*',function(req, res, next){
 console.log("HELLO!!!!");
  if(req.isAuthenticated())
  {
    console.log("req.isauthenti");
    console.log(req.isAuthenticated());
    res.sendFile(path.join(__dirname, 'dist/task-list/index.html'));
  }
  else{
    console.log("Req not auth");
    res.redirect('/api/login');
  }
});
app.use('/', express.static(path.join(__dirname, 'dist/task-list')));

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

module.exports = app;
