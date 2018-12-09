const express= require("express"),
    router = express.Router(),
    passport= require("passport"),
    LocalStrategy = require('passport-local').Strategy;
	User= require("../models/user");


router.get("/",(req,res)=> {
	res.render("home");
})

//Auth routes
router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('/register',(req,res)=>{
    var username = req.body.username;
    var firstname = req.body.firstname;
    var lastname= req.body.lastname;
    var password = req.body.password;
    var country= req.body.country;
    var dob = req.body.dob;
    var phone1= req.body.phone1;

    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();

    if(errors){
        res.render('register',{
            errors:errors
        });
    }
    else{
        //Checking for email and username already taken
        User.findOne({ username: { 
            "$regex": "^" + username + "\\b", "$options": "i"
            }}, function (err, user) {
                            if (user) {
                                const temp = {
                                    user: user,
                                }
                                res.render('register', {temp});
                            }
                            else {
                                var newUser = new User({
                                    firstname: firstname,
                                    lastname: lastname,
                                    username: username,
                                    password: password,
                                    country: country,
                                    dob: dob,
                                    phone1: phone1
                        });
                    User.createUser(newUser, function (err, user) {
                        if (err) throw err;
                            console.log(user);
                    });
                    req.flash('success', 'You are registered and can now login');
                    res.redirect('/users/login');
                    }
                });
    }
});


passport.use(new LocalStrategy(
	function (username, password, done) {
		User.getUserByUsername(username, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.id);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});


//Show Login Form
router.get("/login",(req,res)=>{
	res.render("login");
})

router.post("/login",passport.authenticate("local",
	 {	successRedirect: "/",
         failureRedirect: "/users/login",
         failureFlash: true,
         successFlash: true
	}) ,(req,res)=>{
        res.redirect('/');
});

// Logout route
router.get("/logout",(req,res)=>{
	req.logout();
	req.flash("success","Logged you out");
	res.redirect("/");
})


module.exports = router;