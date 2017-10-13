//get dependencies
var express 		= require("express"),
	bodyParser 		= require("body-parser"),
	methodOverride 	= require("method-override"),
	app 			= express(),
	session 		= require("express-session"),
	passport 		= require("./config/passport");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}


// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

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