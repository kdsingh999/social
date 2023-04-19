const passport = require('passport');
const User = require('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//authentication using passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async function (email, password, done) {
      //find a user and establish the identity
      const user = await User.findOne({ email: email });
      if (!user || user.password != password) {
        console.log('Invalid username/password');
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function (id, done) {
  const user = await User.findById(id);
  return done(null, user);
});

//check user is authenticated
passport.checkAuthentication = function (req, res, next) {
  //if the user is sign in
  if (req.isAuthenticated()) {
    return next();
  }
  //if the user is not signed in
  return res.redirect('/users/signin');
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
    res.locals.user = req.user;
  }
  next();
};
module.exports = passport;
