const express = require('express');
const bodyParser = require('body-parser');
const concept = require('./routes/concept.route'); // Imports routes for the products

// initialize our express app
const app = express();


// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url; // to add back in later
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/concept', concept);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/field.html');
});

app.use("/public", express.static(__dirname + '/views/public'));
app.use("/fonts", express.static(__dirname + '/views/public/fonts'));

let port = 8000;
app.listen(port, () => {
    console.log('Server running on ' + port);
});
