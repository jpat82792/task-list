const passport = require('passport'),
      LocalStrategy = require('passport-local').Strategy;
const user = require('./user-controller.js');
const isAuth = async function(username, password){
  return user.getUser(username, username, password);
}

module.exports = function(app)
{
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
        function(username, password, done){
          var result = isAuth(username, password);
          result.then((e)=>{
            console.log(e);
            if(e.length ===1)
            {
              console.log("user exist");
              return done(null, e[0]);
            }
            else{
              console.log("no user");
              return done(null, false, {message: 'Incorrect credentials.'});
            }
          })
          .catch((e)=>{
            console.log(e);
            return done(null, false, {message: 'Incorrect credentials.'});
          });
        }));
  passport.serializeUser(function(user, done){
    console.log("serialize");
    console.log(user);
    done(null, user.user_id);
  });
  passport.deserializeUser(function(id, done){
    require('./user-controller.js').getUserById(id)
      .then((e) =>{
        console.log("deser");
        console.log(e);
        if(e === null)
        {       
          done(new Error('Wrong user id'));
        }
        done(null, user);
      });
  });
}
