const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-auth');

const MongoStore = require('connect-mongo');



app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(cookieParser());

app.use(express.static('./assests'));
app.use(expressLayout);
app.use(express.urlencoded());

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));

app.use(session({
    name:'codial',
    secret:"hunnyisgreat",
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store:MongoStore.create(
        {
            mongoUrl:'mongodb://localhost/codial_development'
        }

    )
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err)
    {
        console.log(`error:${err}`);
    }
    else{
        console.log(`Server is running on port:${port}`);
    }
})
