const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser=require("body-parser"),
	  mongoose= require("mongoose"),
	  passport = require("passport"),
      LocalStrategy = require("passport-local"),
	  methodOverride = require("method-override"),
      flash = require("connect-flash");
	  session = require('express-session');
	  mongo = require('mongodb');
	  expressValidator = require('express-validator');

const app =express();
const port = process.env.PORT || 3000;


const User= require('./models/user');

//Database Setup
mongoose.connect("mongodb://localhost:27017/smartify_main", { useNewUrlParser: true });  
const db = mongoose.connection;

//Routes Setup
const routes = require('./routes/index');
const users = require('./routes/authenticate');

//View engine setup
app.set('view engine','ejs');

//static folder
//app.use('/public',express.static(path.join(__dirname,'public')));
//app.use(express.static(__dirname + "/public"));

//Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(flash()); 
app.use(methodOverride("_method"));

//Passport Config
app.use(session({
	secret:"Hello secret",
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root    = namespace.shift()
		, formParam = root;
  
	  while(namespace.length) {
		formParam += '[' + namespace.shift() + ']';
	  }
	  return {
		param : formParam,
		msg   : msg,
		value : value
	  };
	}
}));

  

app.use(function(req,res,next){
	res.locals.user = req.user || null;
	res.locals.success = req.flash("success");
	res.locals.error = req.flash("error");
	next();
});

app.use("/",routes);
app.use("/users",users);


app.get('/test',(req,res)=>{
    res.render('register');
})


app.listen(port,function(){
    console.log(`Server Started on ${port}`);
})
