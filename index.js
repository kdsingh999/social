const express = require('express');
const app = express();
const router = require('./routes/index');
const expressLayouts = require('express-ejs-layouts');
const port = 8000;

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

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
