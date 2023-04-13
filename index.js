const express = require('express');
const app = express();
const router = require('./routes/index');
const port = 8000;

app.use('/', router);
app.listen(port, (err) => {
  if (err) {
    console.log(`Error:${err}`);
  } else {
    console.log(`server is started on ${port}`);
  }
});
