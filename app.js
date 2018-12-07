const express = require('express');
const bodyParser= require('body-parser');
const app =express();

//View engine setup
app.set('view engine','ejs');

//static folder
app.use('/public',express.static(path.join(__dirname,'public')));

//Body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send('hello');
})


app.listen(3000,()=>{
    console.log('Server started at 3000');
})