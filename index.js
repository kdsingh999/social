const express = require('express');
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const db = require('./config/mongoose');

//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleWare = require('node-sass-middleware');

app.use(
  sassMiddleWare({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
  })
);
app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('./assets'));
//express router

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//mongostore is used to store the sessio  cookie in the db
app.use(
  session({
    name: 'social',
    //TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: 'disabled',
      },
      function (err) {
        console.log(err || 'connect-mongodb setup ok');
      }
    ),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', router);
app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  } else {
    console.log(`server is started on ${port}`);
  }
});
