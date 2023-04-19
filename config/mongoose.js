const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/codial_development');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Database is not connected'));
db.once('open', () => {
  console.log('database is connected');
});

module.exports = db;
