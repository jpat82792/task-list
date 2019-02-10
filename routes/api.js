const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller.js');
const noteController = require('../controllers/note-controller.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require('../constants/db-config');
const routingUtils = require('../controllers/routingUtils');
/* GET api listing. */


router.delete('/notes/:id', (req, res, next)=>{
  console.log("really?")
  let token = routingUtils.getToken(req.headers);
  console.log("Note delete route");
  if(token){
    noteController.apiDeleteNote(req, res, next);
  }
  else{
    console.log("error");
    res.sendStatus(401);
  }
});


router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/hey', (req, res) => {
  res.send("No, good bye");
});
router.get('/login', (req, res)=>{
  res.render('login.html',{});
});

router.get('/notes', (req, res, next)=>{
  var token = routingUtils.getToken(req.headers);
  if(token){
    noteController.apiGetNotes(req, res, next);
  }
  else{
    res.sendStatus(401);
  }
});

router.patch('/notes/:id', (req, res, next)=>{
  var token = routingUtils.getToken(req.headers);
  if(token){
    noteController.apiUpdateNote(req,res,next); 
  }
  else{
    console.log("error");
    res.sendStatus(401);
  }
});

router.post('/notes', (req, res, next) => {
  var token = routingUtils.getToken(req.headers);

  if(token){
    noteController.apiSetNote(req,res,next); 
  }
  else{
    console.log("error");
    res.sendStatus(401);
  }
});

router.get('/loginState', passport.authenticate('jwt',{session: false}),
  function(req, res){
    var token = routingUtils.getToken(req.headers);
    console.log("loginState()");
    console.log(req.user);
    console.log("Yes it worked");
    if(token){
      res.status(200).json({success: true, msg:'Logged in'});
    }
    else{
      console.log("nah fam");
      res.status(403).send({success: false, msg:'Forbidden'});
    }
  }
);
router.post('/login', (req, res, next)=>{
  console.log("/login");
  const body = req.body;
  var user = userController.getUser(req.body.username, req.body.username, req.body.password);
  user.then((e) => {
    console.log("YAY, user");
    console.log(e[0]);
        var token = jwt.sign(e[0], dbConfig.secret);
    // return the information including token as JSON
    res.json({success: true, token: 'JWT ' + token, user:JSON.stringify(e[0])});
  })
  .catch((e)=>{
   
    console.log("No user");
    console.log(e);
      return res.status(401).render('/login', {messsage: 'Invalid username or password'});
  });
});

router.post('/logout', (req, res, next)=>{
  const body = req.body;
  req.logout();
  res.redirect('/login');
});

router.get('/sign-up', (req, res) =>{
  res.render('sign-up.html', {});
});
router.post('/user', (req, res) =>{
  const body = req.body;
  var result = userController.setUser(body.username, body.email, body.password);
  result.then((e)=>{
    console.log(e);
    res.redirect('/login');
  })
  .catch((e)=>{
    console.log(e);
    res.redirect('/sign-up');
  });
});

module.exports = router;
