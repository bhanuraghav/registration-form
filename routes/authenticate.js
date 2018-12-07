var express= require("express"),
	router = express.Router(),
	User= require("../models/user");


router.get("/",function (req,res) {
	res.send("home");
})

//Auth routes

router.get('/register',(req,res)=>{
    res.render('register');
})

router.post('register',(req,res)=>{
    const newUser = new User({email: req.body.email});
    const tempUser = new User({
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        dob: req.body.dob,
        gender: req.body.gender,
        phone1: req.body.phone1,
        phone2: req.body.phone2,
    });
    User.register(newUser,tempUser,(err,user)=>{
        if(err){
            res.redirect('/register');
        }
        passport.authenticate("local")(req,res,function(){
                // req.flash("success","Welcome to Smartify "+ user.username);
                res.redirect("/");
        }) 
    })
})



// Logout route

router.get("/logout",(req,res)=>{
	req.logout();
	//req.flash("success","Logged you out");
	res.redirect("/");
})


module.exports = router;