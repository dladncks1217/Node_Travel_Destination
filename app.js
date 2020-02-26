const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieparser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportConfig = require('./passport'); //passport의 index연결



const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const joinRouter = require('./routes/join');
const boardRouter = require('./routes/board');

const {sequelize} = require('./models');
const app = express();
sequelize.sync();

require('dotenv').config();

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.set('port',process.env.PORT||8009);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUnitialized:false,
    secret:process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
app.use(flash());

app.use(passport.initialize()); //passport는 세션을 사용해야하기에 반드시 express-session밑에 passport쪽 미들웨어 연결.
app.use(passport.session());
passportConfig(passport);

app.use('/',indexRouter);
app.use('/auth',authRouter);
app.use('/join',joinRouter);
app.use('/board',boardRouter);


app.use((req,res,next)=>{
    const err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});

app.use((err,req,res)=>{
    res.locals.message = err.message;
    res.locals.message = req.app.get('env') === 'development' ? err :{};
    res.status(err.status||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(`${app.get('port')}번 포트에서 서버 대기중입니다!`);
});
