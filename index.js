// Importing Express Framework
var  express  = require("express");

var bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');
// Intializing the app
var app = express();

// Import Route Module
var apiRoutes = require('./routes/api-routes');
var authRoutes = require('./routes/auth-routes');
var postRoutes = require('./routes/post-routes');
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
// Setup server port
var port = process.env.PORT || 3000;
app.use('/v1/api', apiRoutes);
app.use('/v1/auth', authRoutes);
app.use('/v1/api', postRoutes);

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.k1vwi.mongodb.net/node-app", { useNewUrlParser: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
	console.log(err);
    console.log("Connection failed!");
  });
app.get('/', function (req, res) {
    res.json({
        status: 'Main page',
        message: 'Welcome to the world of RESTAPI',
        description: 'Goto /api to explore API'
    });
});
// Launch app to listen to the specified PORT
app.listen(3000, () => {
 console.log(`Server running on port ${port}`);
});

