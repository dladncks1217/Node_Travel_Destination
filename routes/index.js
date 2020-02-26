const express = require('express');
const router = express.Router();
const {User,Post} = require('../models');
const flash = require('connect-flash');


router.get('/',async (req,res,next)=>{
    if(req.isAuthenticated()){
        const user = await User.findOne({where:{id:req.user.id}});
        console.dir(user+ '유저정보');
        await Post.findAndCountAll({
            include:[{
                model:User,
                attributes:['id','nick'],
            }],
        })
        .then((post1)=>{
            console.log('post1');
            res.render('indexloggedin',{
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
            console.log(post1);
            res.render('index',{
                postcount:post1.count,
                post1,
            });
        })
    }
});


router.get('/travel',async (req,res,next)=>{
    if(req.isAuthenticated()){
        const user = await User.findOne({where:{id:req.user.id}});
        
    return res.render('travelloggedin',{user:user.nick});
    }else{
        return res.render('travel');
    }
});

router.get('/profile',async (req,res,next)=>{
    const user = await User.findOne({where:{id:req.user.id}});
    res.render('profile',{user:user.nick});
});

router.post('/profile/change',async (req,res,next)=>{
    try{
        await User.update(
            {nick:req.body.nick},{
            where:{id:req.user.id},
        });
        console.log("일단 들어옴");
        console.log(req.body.nick);
        console.log(req.user.id);
            res.redirect('/profile');
    }catch(error){
        console.log("에러났음");
        console.error(error);
        next(error);
    }
});
module.exports = router;