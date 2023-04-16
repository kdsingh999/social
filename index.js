const express = require('express');
const app = express();
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;
const DBConnection = require('./config/mongoose');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
DBConnection();
app.use(express.static('./assets'));
//express router
app.use('/', router);

//setup view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  } else {
    console.log(`server is started on ${port}`);
  }
});
