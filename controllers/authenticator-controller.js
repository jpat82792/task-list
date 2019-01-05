const passport = require('passport'),
      jwtStrategy = require('passport-jwt').Strategy,
      extractJwt = require('passport-jwt').ExtractJwt;

const user = require('./user-controller.js');
const dbConfig = require('../constants/db-config.js');

const isAuth = async function(username, password){
  return user.getUser(username, username, password);
}

module.exports = function(app)
{
  app.use(passport.initialize());
  app.use(passport.session());
  var opts = {};
  opts.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
  opts.secretOrKey = dbConfig.secret;

  passport.use(new jwtStrategy(opts,
        function(jwt_payload, done){
          var result = isAuth(jwt_payload.username, jwt_payload.password);
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
