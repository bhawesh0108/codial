const Post = require('../models/post');

module.exports.home = function(req,res){


    Post.find({}).populate('user').exec(function(err,posts){

        if(err)
        {
            console.log(err);
            return ;
        }
        else{
            return res.render('home',{
                title:'Home',
                posts:posts
            });
        }


    })
   

   
}