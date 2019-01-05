// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const dbConfig = require('./constants/db-config');
const morgan = require('morgan');
// Get our API routes
const api = require('./routes/api');
const app = express();
const expressSession = require('express-session');
app.use(expressSession({
  secret:dbConfig.secret,
  resave:false,
  saveUninitialized:false
}));
const passport = require('./controllers/authenticator-controller.js')(app);
//const router = require('./routes/router.js');
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Configure engine to use ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Point static path to dist
app.use('/',express.static(path.join(__dirname, 'dist/task-list')));


//app.use('/', express.static(path.join(__dirname, 'dist/task-list')));
app.use('/api',api);

app.all('*',function(req, res, next){
  res.render(path.join(__dirname, 'dist/task-list'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

module.exports = app;
