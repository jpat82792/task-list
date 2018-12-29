const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller.js');
const passport = require('passport');
//const authController = require('../controllers/authentication-controller.js');
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
router.post('/login', (req, res)=>{
  const body = req.body;
  passport.authenticate('local',(err, user, info)=>{
    if(err){handleResponse(res, 500, 'error');}
    if(!user){handleResponse(res, 400, 'bad req');}
    if(user){res.redirect('');}
  })(req, res);
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
