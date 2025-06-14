const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser');

const app = express();

connectDB();



//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//routes
app.use('/user', userRoutes);
app.get('/',(req,res)=>{
    res.send('WELCOME TO APP')
})


module.exports = app