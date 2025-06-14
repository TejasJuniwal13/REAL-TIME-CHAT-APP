const dotenv = require('dotenv');
dotenv.config();
const http = require('http');
const app = require('./app');
const { create } = require('domain');
const { log } = require('console');

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;


server.listen(PORT,()=>{
    console.log(`Server listening at port ${PORT}`);
    
})