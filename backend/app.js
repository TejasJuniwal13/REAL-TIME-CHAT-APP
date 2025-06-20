const express = require('express');
const morgan = require('morgan');
const connectDB = require('./db/connect');
const userRoutes = require('./routes/user.routes')
const cookieParser = require('cookie-parser');
const cors = require('cors');
const projectRoutes = require('./routes/project.routes');
const app = express();

connectDB();



//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());


//routes
app.use('/user', userRoutes);
app.use('/projects', projectRoutes);
app.get('/',(req,res)=>{
    res.send('WELCOME TO APP')
})


module.exports = app