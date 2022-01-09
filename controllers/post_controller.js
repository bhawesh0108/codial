const Post = require('../models/post');

module.exports.createPost = function(req,res){

    Post.create({
        content:req.body.content,
        user:req.user.id
    },function(err,post){
        if(err)
        {
            console.log('There is an error in creating Post!!');
            return res.redirect('back');
        }
        else{
            console.log('Post created!!');
            return res.redirect('back');
        }
        
    })

}