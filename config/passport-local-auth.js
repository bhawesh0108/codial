const passport = require('passport');

const LocalStratergy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStratergy({
    usernameField:'email'
},
function(email,password,done)
{
    User.findOne({email:email},function(err,user){
        if(err)
        {
            console.log("There is an error in finding user while sign in!!");
            done(err);
        }
        if(!user || user.password!=password)
        {
            console.log("Invalid Email/Password");
            done(null,false);
        }
        done(null,user);
    })
}


));


passport.serializeUser(function(user,done)
{
{
    done(null,user.id);
}
}
)

passport.deserializeUser(function(id,done)
{
{
    User.findById(id,function(err,user){
        if(err)
        {
            console.log("There is an error in finding user while deserializing !!");
            done(err);
        }
        done(null,user);
    })
}
}
);



passport.checkAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    else{
        return res.redirect('/users/signin');
    }
}

passport.setAuthentication = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user = req.user;
    }
    next();
}


module.exports = passport;