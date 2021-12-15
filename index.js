const express = require('express');
const app = express();
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose');
const port = 8000;



app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use(express.static('./assests'));
app.use(expressLayout);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
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
