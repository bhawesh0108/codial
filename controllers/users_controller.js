const User = require('../models/user');

module.exports.profile = function(req,res){

    if(req.cookies.user_id)
    {
            User.findById(req.cookies.user_id,function(err,user){
                if(err)
                {
                    console.log('There is an error in finding user!!');
                    return res.redirect('/users/signin');
                }
                if(user)
                {
                    return res.render('profile',{
                        title:'Profile Page',
                        user:user
                    })
                }
                else{
                    return res.redirect('/users/signin');
                }
            })
    }
    else{
        return res.redirect('/users/signin');
    }




}

module.exports.signup = function(req,res){
    return res.render('signUp',{
        title:'Sign Up'
    });
}

module.exports.signin = function(req,res){
    return res.render('signIn',{
        title:'Sign In'
    });
}

module.exports.createUser = function(req,res){

    if(req.body.password!=req.body.confirmPassword)
    {
        console.log('password not matched!!')
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err)
        {
            console.log("There is an error in finding user while sign up!!");
            return res.redirect('back');
        }
        if(!user)
        {

            User.create(req.body,function(err,newuser){
                if(err)
                {
                    console.log('There is an error in adding new user!!');
                    return res.redirect('back');
                }
                else{
                
                    return res.redirect('/users/signin');
                }
            })


        }
        else{
            console.log("There is already user with the same email id");
            return res.redirect('back');
        }
    })






}

module.exports.createSession = function(req,res){

     User.findOne({email:req.body.email},function(err,user){
         if(err)
         {
             console.log("There is an error in finding user in sign in!!");
             return res.redirect('back');
         }
         if(user)
         {
             if(user.password!=req.body.password)
             {
                 return res.redirect('back');
             }
             else{
                 res.cookie('user_id',user.id);
                 return res.redirect('/users/profile');
             }
         }
         else{
             return res.redirect('back');
         }
     })

}