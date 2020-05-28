var express = require('express');
var cors = require('cors');
const session = require('express-session')
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
// require("dotenv").config(); 

// Requiring our models for syncing
var db = require('./models');


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true
})); 
app.use(session({secret: 'something secret here', resave: true, saveUninitialized: true, cookie:{maxAge: 7200000}}))


// Static directory
app.use(express.static('public'));


const routes = require("./controllers/routes");

app.use("/", routes);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(PORT, function() {
    console.log('App listening on PORT ' + PORT);
    });
});