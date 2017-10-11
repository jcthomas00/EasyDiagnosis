//get dependencies
var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();

//get heroku port is available
var port = process.env.PORT  || 3000;

//use the 'public' folder as the static root for all static files like images...
app.use(express.static("public"));

//configure bodyParser for easy use of html components
app.use(bodyParser.urlencoded({extended : false}));
app.use(methodOverride("_method"));

//setup handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout : "main" }));
app.set("view engine", "handlebars");

//import routes and have our server use them
var routes = require("./controllers/symptoms_controller.js");
app.use("/", routes);

//listen on previously determined port
app.listen(port);