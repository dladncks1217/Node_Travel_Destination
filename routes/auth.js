const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');
const {User} = require('../models');

router.get('/',(req,res,next)=>{
    res.render('auth');
});

router.post('/login',isNotLoggedIn, (req,res,next)=>{ //req.body.email  req.body.password
    passport.authenticate('local',(authError,user,info)=>{
    if(authError){
        console.error(authError);
        return next(authError);
    }
    if(!user){
        req.flash('loginError',info.message);                
        return res.redirect('/auth');
    }
    return req.login(user,(loginError)=>{ //req.user
        
        if(loginError){
            console.error(loginError);
            return next(loginError);
        }
        console.log('리디렉션됨');
        return res.redirect('/');
    });
    })(req,res,next);
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy(); //req.user
    res.redirect('/');
});

module.exports = router;