const express = require('express');
const router = express.Router();
const path = require('path');
const{User,Post} = require('../models');


router.get('/',async (req,res,next)=>{
    try{
        if(req.isAuthenticated()){
            const user = await User.findOne({where:{id:req.user.id}});
            await Post.findAndCountAll({
                include:[{
                    model:User,
                    attributes:['id','nick'],
                }],
            })
            .then((post1)=>{
                res.render('board',{
                    isLoggedIn:req.isAuthenticated(),
                    user:user.nick,
                    postcount:post1.count,
                    post1,
                });
            });
        }else{
            await Post.findAndCountAll({
                include:[{
                    model:User,
                    attributes:['id','nick'],
                }],
            })
            .then((post1)=>{
                res.render('board',{
                    isLoggedIn:req.isAuthenticated(),
                    postcount:post1.count,
                    post1,
                });
            })
        }
    }catch(err){
        console.error(err);
        next(err);
    }
});

router.post('/post', async (req,res,next)=>{
    try{
        await Post.create({
           content:req.body.content,
           place:req.body.place,
           nick:req.user.nick, 
        });
        res.redirect('/board');
    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;