const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {User} = require('../models');
const flash = require('connect-flash');

router.get('/',(req,res,next)=>{
    res.render('join');
});

router.post('/join',isNotLoggedIn, async (req,res,next)=>{
    const {email,nick,password} = req.body;
    try{
        if(email==''||nick==''||password==''){
            
            res.redirect('/join');
        }
        const exUser = await User.find({ where: { email } });  
        if(exUser){
            req.flash('joinError','이미 가입된 아이디입니다.');
            return res.redirect('/join');
        } 
        console.time('암호화 시간 확인용')
        const hash = await bcrypt.hash(password,12);
        console.timeEnd('암호화 시간 확인용');
        await User.create({
            email,
            nick, 
            password: hash,
        });
        
        return res.redirect('/');
    }catch(error){
        console.error(error);
        return next(error);
    }
});
module.exports = router;