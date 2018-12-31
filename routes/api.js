const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller.js');
const passport = require('passport');

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
router.post('/login', (req, res, next)=>{
  const body = req.body;
  passport.authenticate('local',(err, user, info)=>{
    if(err){return next(err)}
    if(!user){
      return res.render('/login', {messsage: 'Invalid username or password'});
    }
    req.logIn(user, function(err){
      if(err)
      {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
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
