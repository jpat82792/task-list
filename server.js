// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

// Get our API routes
const api = require('./routes/api');
const app = express();
const router = require('./routes/router.js');
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//Route roots
app.use('/api',api);
//app.use('/', router);
/*app.get('/', (req, res) =>{
  res.sendFile(path.join(__dirname, 'dist/task-list/index.html'));
});*/

//Configure engine to use ejs
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
// Point static path to dist
app.use('/', express.static(path.join(__dirname, 'views')));

app.use('/', express.static(path.join(__dirname, 'dist/task-list')));
app.use(function(req, res, next){
  res.sendFile(path.join(__dirname, 'dist/task-list/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

module.exports = app;
