const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const dbConfig = require('../constants/db-config.js');
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/hey', (req, res) => {
  res.send("No, good bye");
});
router.get('/login', (req, res)=>{
  res.render('login.html',{});
});
router.get('/loginState', passport.authenticate('jwt',{session: false}),
  function(req, res){
    console.log("Token:");
    var token = getToken(req.headers);
    console.log(token);
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
  const body = req.body;
  var user = userController.getUser(req.body.username, req.body.username, req.body.password);
  user.then((e) => {
    console.log("YAY, user");
    console.log(e);
        var token = jwt.sign(e[0], dbConfig.secret);
    // return the information including token as JSON
    res.json({success: true, token: 'JWT ' + token});
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
var getToken = function (headers) {
  console.log("getToken()");
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;
